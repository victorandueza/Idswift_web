const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { google } = require('googleapis');
const createCors = require('cors');

// Dominios permitidos (navegador). Hosting → Function (server-to-server) puede venir SIN Origin.
const allowedOrigins = [
  'https://idswiftsolutions.com',
  'https://www.idswiftsolutions.com',
  'https://idswift.web.app',
  'https://idswift.firebaseapp.com',
];
const allowedOriginSet = new Set(allowedOrigins);

// CORS: permite sin Origin (server-to-server) y valida solo los origins listados.
const cors = createCors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);          // ← clave: Hosting/CR/cron, etc.
    if (allowedOriginSet.has(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204,
});

const GMAIL_CLIENT_ID = defineSecret('GMAIL_CLIENT_ID');
const GMAIL_CLIENT_SECRET = defineSecret('GMAIL_CLIENT_SECRET');
const GMAIL_REFRESH_TOKEN = defineSecret('GMAIL_REFRESH_TOKEN');

const encodeMessage = (content) =>
  Buffer.from(content, 'utf8').toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

const wrapBase64 = (input) => input.replace(/.{1,76}(?=.)/g, '$&\r\n');

const buildEmail = ({ to, from, replyTo, subject, text }) => {
  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: ${subject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ].filter(Boolean).join('\r\n');
  const normalizedText = String(text ?? '').replace(/\r?\n/g, '\r\n');
  const base64Body = Buffer.from(normalizedText, 'utf8').toString('base64');
  const body = wrapBase64(base64Body);
  const finalBody = body.endsWith('\r\n') || body.length === 0 ? body : `${body}\r\n`;
  return encodeMessage(`${headers}\r\n\r\n${finalBody}`);
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Evita inyección de cabeceras en Reply-To
const safeHeader = (s) => String(s || '').replace(/[\r\n]/g, ' ').replace(/[<>]/g, '');

const sanitizeHeaderText = (s) => String(s || '').replace(/[\r\n]+/g, ' ').trim();
const needsEncodedWord = (s) => /[^\u0020-\u007E]/.test(s);
const encodeHeaderWord = (s) => `=?UTF-8?B?${Buffer.from(s, 'utf8').toString('base64')}?=`;

const formatDisplayName = (name) => {
  const clean = safeHeader(name).trim();
  if (!clean) return '';
  if (needsEncodedWord(clean)) {
    return encodeHeaderWord(clean);
  }
  if (/[",]/.test(clean)) {
    return `"${clean.replace(/"/g, '\\"')}"`;
  }
  return clean;
};

const formatAddressHeader = (name, email) => {
  const cleanEmail = safeHeader(email);
  if (!cleanEmail) return '';
  const displayName = formatDisplayName(name);
  return displayName ? `${displayName} <${cleanEmail}>` : cleanEmail;
};

const prepareSubject = (subject) => {
  const clean = sanitizeHeaderText(subject);
  return needsEncodedWord(clean) ? encodeHeaderWord(clean) : clean;
};

exports.contactSubmit = onRequest({
  region: 'europe-west1',
  invoker: 'private',     // ← mantenemos privada por tu política de dominio
  cors: false,
  maxInstances: 10,
  secrets: [GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN],
}, async (req, res) => {
  // Envolvemos TODO con cors para que gestione preflight y cabeceras
  cors(req, res, async () => {
    try {
      if (req.method === 'OPTIONS') {
        // Preflight OK (cors ya añadió cabeceras)
        return res.status(204).end();
      }
      if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
      }

      // ⚠️ Importante: NO bloquear por Origin aquí.
      // (Si viene Origin, cors ya lo validó; si no viene, es server-to-server y se permite)

      const { name, email, message } = req.body || {};
      const trimmedName = typeof name === 'string' ? name.trim() : '';
      const trimmedEmail = typeof email === 'string' ? email.trim() : '';
      const trimmedMessage = typeof message === 'string' ? message.trim() : '';

      if (!trimmedName || !trimmedEmail || !trimmedMessage) {
        return res.status(400).json({ ok: false, error: 'Missing required fields.' });
      }
      if (!emailRegex.test(trimmedEmail)) {
        return res.status(400).json({ ok: false, error: 'Invalid email address.' });
      }
      if (trimmedMessage.length > 5000) {
        return res.status(400).json({ ok: false, error: 'Message too long.' });
      }

      // OAuth2 Gmail
      const oauth2 = new google.auth.OAuth2(GMAIL_CLIENT_ID.value(), GMAIL_CLIENT_SECRET.value());
      oauth2.setCredentials({ refresh_token: GMAIL_REFRESH_TOKEN.value() });
      const gmail = google.gmail({ version: 'v1', auth: oauth2 });

      const sender = formatAddressHeader('IDS Contact', 'info@idswiftsolutions.com');
      const replyToHeader = formatAddressHeader(trimmedName, trimmedEmail);
      const subject = prepareSubject(`New contact from ${trimmedName}`);
      const textBody = `${trimmedMessage}\n\n—\nName: ${trimmedName}\nEmail: ${trimmedEmail}`;

      const raw = buildEmail({
        to: 'info@idswiftsolutions.com',
        from: sender || 'info@idswiftsolutions.com',
        replyTo: replyToHeader,
        subject,
        text: textBody,
      });

      await gmail.users.messages.send({ userId: 'me', requestBody: { raw } });
      return res.json({ ok: true });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ ok: false, error: 'Server error.' });
    }
  });
});
