(function () {
  const translations = {
    en: {
      common: {
        aria: {
          header: 'Header',
          logo: 'Go to home',
          nav: 'Primary navigation',
          cookieDialog: 'Cookie preferences',
          languageSelector: 'Language selector',
        },
        nav: {
          home: 'Home',
          services: 'Services',
          clients: 'Clients',
          contact: 'Contact',
          privacy: 'Privacy',
          menuToggle: {
            open: 'Menu',
            close: 'Close',
            ariaOpen: 'Open navigation menu',
            ariaClose: 'Close navigation menu',
          },
        },
        languages: {
          en: 'English',
          es: 'Spanish',
          switch: {
            en: 'Switch to English',
            es: 'Switch to Spanish',
          },
        },
        cta: {
          startProject: 'Start a project',
        },
        footer: {
          privacy: 'Privacy',
        },
        cookie: {
          message: 'We use cookies to personalise content and measure traffic. Learn more in the <a href="privacy.html">privacy notice</a>.',
          accept: 'Accept',
          settings: 'Settings',
        },
        forms: {
          contact: {
            aria: 'Contact form',
            heading: 'Start the conversation',
            intro: 'Share a few details so we can prepare a relevant proposal.',
            labels: {
              name: 'Name',
              email: 'Email',
              message: 'Message',
              consent: 'I have read and accept the <a href="privacy.html">privacy policy</a>.',
            },
            placeholders: {
              name: 'Your name',
              email: 'you@hotelgroup.com',
              message: 'What would you like to achieve?',
            },
            checklist: {
              heading: 'Project checklist',
              intro: 'Include these details if you already have them:',
              items: [
                'Number of properties and expected seasonal volume.',
                'PMS, channel manager, or CRM that we should integrate.',
                'Current pain points during check-in or verification.',
                'Desired go-live date and internal stakeholders.',
              ],
            },
            actions: {
              send: 'Send',
              sending: 'Sending...',
            },
            status: {
              success: 'Thanks! We will be in touch very soon.',
              error: 'Something went wrong. Sorry for the inconvenience; please email the same details to info@idswiftsolutions.com.',
              configure: 'Configure the form ACTION_URL before going live.',
            },
            contactInfo: 'Prefer to email us directly? Write to <a href="mailto:info@idswiftsolutions.com">info@idswiftsolutions.com</a>.',
            validation: {
              name: 'Please enter your name.',
              email: 'Please enter a valid email address.',
              message: 'Tell us a little more about your project (min. 10 characters).',
              consent: 'You must accept the privacy policy.',
            },
          },
        },
      },
      home: {
        meta: {
          title: 'IDSWIFT | Hotel Check-in Automation',
          description: "IDSWIFT automates hotel check-in with digital ID capture, secure payments, and PMS integrations.",
          ogTitle: 'IDSWIFT | Hotel Check-in Automation',
          ogDescription: "Accelerate arrivals with IDSWIFT's digital check-in platform.",
        },
        hero: {
          aria: 'Hotel check-in hero',
          eyebrow: 'IDSWIFT Platform',
          title: 'Digital check-in that keeps your lobby in flow.',
          lead: 'Capture IDs, verify guests, secure payments, and sync every record to your PMS &mdash; all before they reach the front desk.',
          ctaPrimary: 'Book a demo',
          ctaSecondary: 'See how it works',
        },
        highlights: {
          aria: 'Highlights',
          cards: [
            {
              title: 'End-to-end automation',
              body: 'Capture IDs, verify guests with OCR + AI, finalise payments, and sync everything with your PMS.',
              cta: 'Explore services',
            },
            {
              title: 'Guest-centric journeys',
              body: 'Deliver mobile pre check-in, kiosk experiences, and timely notifications designed around traveller comfort.',
              cta: 'Read client results',
            },
            {
              title: 'Compliance by design',
              body: 'GDPR-ready workflows, auditable logs, and encrypted retention policies keep regulators and partners aligned.',
              cta: 'Review policy',
            },
          ],
        },
      },
      services: {
        meta: {
          title: 'IDSWIFT | Services',
          description: 'Discover IDSWIFT services: pre check-in journeys, PMS integrations, automation, and hospitality compliance.',
        },
        header: {
          aria: 'Services page header',
          title: 'Services',
          intro: 'We design and build digital check-in experiences that blend automation with hospitality-grade UX.',
        },
        core: {
          aria: 'Core services',
          title: 'What we deliver',
          intro: 'Combine the modules that make sense for your properties and brand standards.',
          cards: [
            {
              title: 'Web & Mobile Experiences',
              body: 'Landing pages, admin portals, mobile-first pre check-in flows, and kiosk interfaces built for conversion.',
            },
            {
              title: 'Integrations & Cloud',
              body: 'REST + SOAP PMS integrations, payment gateways, identity providers, and real-time analytics pipelines.',
            },
            {
              title: 'Automation & AI',
              body: 'OCR and face match, fraud rules, smart routing, document storage, and proactive guest communications.',
            },
          ],
        },
        engagement: {
          aria: 'Engagement model',
          title: 'How collaboration works',
          steps: [
            {
              title: '01. Discovery',
              body: 'Process mapping workshops to identify bottlenecks, regulatory constraints, and integration needs.',
            },
            {
              title: '02. Delivery',
              body: 'Agile delivery with weekly demos, shared backlog, and traceable documentation across environments.',
            },
            {
              title: '03. Growth',
              body: 'Ongoing optimisation, conversion experiments, SLA-backed support, and training for front-desk teams.',
            },
          ],
        },
        cta: {
          aria: 'Call to action',
          title: 'Ready to upgrade guest arrivals?',
          lead: 'Let IDSWIFT tailor a roadmap for your PMS stack, properties, and compliance requirements.',
          action: 'Start a project',
        },
      },
      clients: {
        meta: {
          title: 'IDSWIFT | Clients',
          description: 'See how hotel groups use IDSWIFT to accelerate arrivals, lift NPS, and keep compliance in check.',
        },
        header: {
          aria: 'Clients page header',
          title: 'Clients',
          intro: 'Hospitality brands partnering with IDSWIFT to turn check-in into a fast, delightful moment for guests.',
        },
        testimonials: {
          aria: 'Testimonials',
          title: 'What partners say',
          quotes: [
            {
              quote: '&ldquo;They helped us launch in six weeks with a robust, scalable backend and polished kiosk UX.&rdquo;',
              author: '- Operations Director, UrbanStay',
            },
            {
              quote: '&ldquo;Excellent communication and a clear focus on the business metrics that matter to our guests.&rdquo;',
              author: '- Product Lead, Coastline Hotels',
            },
            {
              quote: '&ldquo;We automated check-in and saved hundreds of staff hours every month while improving reviews.&rdquo;',
              author: '- CEO, BoutiqueOne',
            },
          ],
        },
        impact: {
          aria: 'Impact metrics',
          title: 'Impact snapshot',
          cards: [
            {
              title: '80% faster arrivals',
              body: 'Average time at reception dropped from 7 minutes to 80 seconds with mobile pre check-in.',
            },
            {
              title: '+18 NPS points',
              body: 'Guest satisfaction scores improved through clearer communication and digital room selection.',
            },
            {
              title: '60% fewer chargebacks',
              body: 'Secure payments and ID verification reduced disputes thanks to traceable consent flows.',
            },
          ],
        },
        cta: {
          aria: 'Call to action',
          title: 'Want a similar outcome?',
          lead: 'Share your targets and IDSWIFT will prepare a tailored plan with projections.',
          action: 'Talk to the team',
        },
      },
      contact: {
        meta: {
          title: 'IDSWIFT | Contact',
          description: 'Contact the IDSWIFT team to scope your hotel check-in automation roadmap.',
        },
        header: {
          aria: 'Contact page header',
          title: 'Contact',
          intro: 'Tell us about your properties, PMS stack, and guest experience goals. The IDSWIFT team replies within 24-48 business hours.',
        },
      },
      privacy: {
        meta: {
          title: 'IDSWIFT | Privacy',
          description: "Review IDSWIFT's privacy notice, data processing details, and cookie preferences.",
        },
        header: {
          aria: 'Privacy page header',
          title: 'Privacy Notice',
          intro: 'IDSWIFT treats guest data with the same care that hospitality teams put into their service.',
        },
        summary: {
          aria: 'Privacy details',
          title: 'Data processing summary',
          intro: 'This overview helps you understand who processes your information, why we do it, and how we protect it.',
          cards: [
            {
              sections: [
                {
                  title: 'Data controller',
                  body: 'IDSWIFT Labs, S.L. - VAT ESB12345678 - Calle Ejemplo 12, 28000 Madrid (Spain). Email: <a href="mailto:privacy@idswift.com">privacy@idswift.com</a>',
                },
                {
                  title: 'Purpose',
                  body: 'To deliver the hotel check-in platform, onboard users, manage customer support, and send service-related communications.',
                },
                {
                  title: 'Legal basis',
                  body: 'Legitimate interest, contractual necessity, and explicit consent when required (e.g. marketing opt-ins).',
                },
                {
                  title: 'Retention',
                  body: 'We keep personal data for as long as necessary to provide the service and comply with legal obligations. Afterwards we block it according to statutory periods.',
                },
              ],
            },
            {
              sections: [
                {
                  title: 'Recipients',
                  body: 'Service providers that enable hosting, messaging, analytics, and support. We never sell data and we only share it when strictly necessary or under legal mandate.',
                },
                {
                  title: 'International transfers',
                  body: 'If we transfer data outside the EU/EEA, we rely on adequate safeguards such as Standard Contractual Clauses or approved certification mechanisms.',
                },
                {
                  title: 'Rights',
                  body: 'You can access, rectify, delete, oppose, restrict, or port your data. Contact <a href="mailto:privacy@idswift.com">privacy@idswift.com</a> or submit a claim to the Spanish DPA (AEPD).',
                },
                {
                  title: 'Cookies',
                  body: 'We use strictly necessary cookies and optional analytics cookies. You can manage consent at any time from this site.',
                },
              ],
            },
            {
              sections: [
                {
                  title: 'Security',
                  body: 'TLS encryption, access controls, logging, regular backups, and vendor due diligence keep your information safe.',
                },
                {
                  title: 'DPO contact',
                  body: 'If we appoint a Data Protection Officer, you can reach them at <a href="mailto:dpo@idswift.com">dpo@idswift.com</a>.',
                },
                {
                  title: 'Updates',
                  body: 'We will update this notice whenever we change how we process data. Last review: <span id="policyDate"></span>.',
                },
                {
                  title: 'Need a signed DPA?',
                  body: 'Reach out to our legal team to request a tailored Data Processing Agreement for your organisation.',
                },
              ],
            },
          ],
        },
        cookies: {
          aria: 'Cookie preferences',
          title: 'Cookie categories',
          cards: [
            {
              title: 'Strictly necessary',
              body: 'Required for login sessions, language preferences, and secure request handling. Cannot be disabled.',
            },
            {
              title: 'Analytics',
              body: 'Help us understand usage so we can improve flows. Enabled only with your explicit consent.',
            },
            {
              title: 'Marketing',
              body: 'Used occasionally for product updates or remarketing. Disabled by default unless you opt in.',
            },
          ],
        },
      },
    },
    es: {
      common: {
        aria: {
          header: 'Encabezado',
          logo: 'Ir a la página de inicio',
          nav: 'Navegación principal',
          cookieDialog: 'Preferencias de cookies',
          languageSelector: 'Selector de idioma',
        },
        nav: {
          home: 'Inicio',
          services: 'Servicios',
          clients: 'Clientes',
          contact: 'Contacto',
          privacy: 'Privacidad',
          menuToggle: {
            open: 'Menú',
            close: 'Cerrar',
            ariaOpen: 'Abrir menú de navegación',
            ariaClose: 'Cerrar menú de navegación',
          },
        },
        languages: {
          en: 'Inglés',
          es: 'Español',
          switch: {
            en: 'Cambiar a inglés',
            es: 'Cambiar a español',
          },
        },
        cta: {
          startProject: 'Iniciar un proyecto',
        },
        footer: {
          privacy: 'Privacidad',
        },
        cookie: {
          message: 'Usamos cookies para personalizar el contenido y medir el tráfico. Más información en el <a href="privacy.html">aviso de privacidad</a>.',
          accept: 'Aceptar',
          settings: 'Configuración',
        },
        forms: {
          contact: {
            aria: 'Formulario de contacto',
            heading: 'Inicia la conversación',
            intro: 'Compártenos algunos detalles para preparar una propuesta relevante.',
            labels: {
              name: 'Nombre',
              email: 'Correo electrónico',
              message: 'Mensaje',
              consent: 'He leído y acepto la <a href="privacy.html">política de privacidad</a>.',
            },
            placeholders: {
              name: 'Tu nombre',
              email: 'tú@hotelgroup.com',
              message: '¿Qué te gustaría conseguir?',
            },
            checklist: {
              heading: 'Lista de proyecto',
              intro: 'Incluye esta información si ya la tienes:',
              items: [
                'Número de propiedades y volumen previsto por temporada.',
                'PMS, channel manager o CRM con el que debamos integrarnos.',
                'Principales fricciones durante el check-in o la verificación.',
                'Fecha objetivo de salida a producción y responsables internos.',
              ],
            },
            actions: {
              send: 'Enviar',
              sending: 'Enviando...',
            },
            status: {
              success: '¡Gracias! Nos pondremos en contacto muy pronto.',
              error: 'Algo salió mal. Disculpa las molestias; envía la misma información a info@idswiftsolutions.com.',
              configure: 'Configura el ACTION_URL del formulario antes de publicar.',
            },
            contactInfo: '¿Prefieres escribirnos directamente? Envía un correo a <a href="mailto:info@idswiftsolutions.com">info@idswiftsolutions.com</a>.',
            validation: {
              name: 'Por favor, indica tu nombre.',
              email: 'Introduce un correo electrónico válido.',
              message: 'Cuéntanos un poco más sobre tu proyecto (mínimo 10 caracteres).',
              consent: 'Debes aceptar la política de privacidad.',
            },
          },
        },
      },
      home: {
        meta: {
          title: 'IDSWIFT | Automatización del check-in hotelero',
          description: 'IDSWIFT automatiza el check-in del hotel con captura digital de documentos, pagos seguros e integraciones con el PMS.',
          ogTitle: 'IDSWIFT | Automatización del check-in hotelero',
          ogDescription: 'Acelera las llegadas con la plataforma de check-in digital de IDSWIFT.',
        },
        hero: {
          aria: 'Hero de check-in hotelero',
          eyebrow: 'Plataforma IDSWIFT',
          title: 'Check-in digital que mantiene tu lobby en movimiento.',
          lead: 'Captura documentos, verifica huéspedes, asegura pagos y sincroniza cada registro con el PMS antes de que lleguen a recepción.',
          ctaPrimary: 'Solicitar una demo',
          ctaSecondary: 'Ver cómo funciona',
        },
        highlights: {
          aria: 'Aspectos destacados',
          cards: [
            {
              title: 'Automatización integral',
              body: 'Captura documentos, verifica huéspedes con OCR + IA, finaliza pagos y sincroniza todo con tu PMS.',
              cta: 'Explorar servicios',
            },
            {
              title: 'Experiencias centradas en el huésped',
              body: 'Ofrece pre check-in móvil, kioscos y notificaciones oportunas diseñadas para el confort del viajero.',
              cta: 'Ver resultados de clientes',
            },
            {
              title: 'Cumplimiento por diseño',
              body: 'Flujos preparados para GDPR, registros auditables y retención cifrada para alinear a reguladores y partners.',
              cta: 'Revisar política',
            },
          ],
        },
      },
      services: {
        meta: {
          title: 'IDSWIFT | Servicios',
          description: 'Descubre los servicios de IDSWIFT: pre check-in, integraciones con PMS, automatización y cumplimiento para hospitality.',
        },
        header: {
          aria: 'Encabezado de servicios',
          title: 'Servicios',
          intro: 'Diseñamos y construimos experiencias de check-in digital que combinan automatización con UX de nivel hotelero.',
        },
        core: {
          aria: 'Servicios principales',
          title: 'Qué entregamos',
          intro: 'Combina los módulos que tengan sentido para tus propiedades y estándares de marca.',
          cards: [
            {
              title: 'Experiencias web y móvil',
              body: 'Landing pages, portales de administración, flujos de pre check-in mobile-first y kioscos optimizados para convertir.',
            },
            {
              title: 'Integraciones y cloud',
              body: 'Integraciones REST + SOAP con PMS, pasarelas de pago, proveedores de identidad y analítica en tiempo real.',
            },
            {
              title: 'Automatización e IA',
              body: 'OCR y comparación facial, reglas antifraude, ruteo inteligente, archivo documental y comunicaciones proactivas.',
            },
          ],
        },
        engagement: {
          aria: 'Modelo de colaboración',
          title: 'Cómo colaboramos',
          steps: [
            {
              title: '01. Descubrimiento',
              body: 'Workshops de procesos para identificar cuellos de botella, requisitos normativos y necesidades de integración.',
            },
            {
              title: '02. Entrega',
              body: 'Entrega ágil con demos semanales, backlog compartido y documentación trazable en todos los entornos.',
            },
            {
              title: '03. Crecimiento',
              body: 'Optimización continua, experimentos de conversión, soporte con SLA y formación para equipos de recepción.',
            },
          ],
        },
        cta: {
          aria: 'Llamada a la acción',
          title: '¿Listo para mejorar las llegadas?',
          lead: 'IDSWIFT prepara una hoja de ruta alineada con tu stack PMS, propiedades y requisitos de cumplimiento.',
          action: 'Iniciar un proyecto',
        },
      },
      clients: {
        meta: {
          title: 'IDSWIFT | Clientes',
          description: 'Descubre cómo los grupos hoteleros usan IDSWIFT para acelerar las llegadas, elevar el NPS y asegurar el cumplimiento.',
        },
        header: {
          aria: 'Encabezado de clientes',
          title: 'Clientes',
          intro: 'Marcas hoteleras que confían en IDSWIFT para convertir el check-in en un momento rápido y agradable.',
        },
        testimonials: {
          aria: 'Testimonios',
          title: 'Lo que dicen los partners',
          quotes: [
            {
              quote: '&ldquo;Nos ayudaron a lanzar en seis semanas con un backend robusto, escalable y una UX de kiosco impecable.&rdquo;',
              author: '- Director de Operaciones, UrbanStay',
            },
            {
              quote: '&ldquo;Comunicación excelente y foco claro en los indicadores de negocio que importan a nuestros huéspedes.&rdquo;',
              author: '- Líder de Producto, Coastline Hotels',
            },
            {
              quote: '&ldquo;Automatizamos el check-in y ahorramos cientos de horas de staff al mes mientras mejoraban las reseñas.&rdquo;',
              author: '- CEO, BoutiqueOne',
            },
          ],
        },
        impact: {
          aria: 'Métricas de impacto',
          title: 'Radiografía del impacto',
          cards: [
            {
              title: '80% llegadas más rápidas',
              body: 'El tiempo medio en recepción bajó de 7 minutos a 80 segundos con el pre check-in móvil.',
            },
            {
              title: '+18 puntos NPS',
              body: 'Las encuestas de satisfacción mejoraron gracias a una comunicación más clara y selección digital de habitación.',
            },
            {
              title: '60% menos contracargos',
              body: 'Pagos seguros y verificación documental redujeron disputas gracias a flujos de consentimiento trazables.',
            },
          ],
        },
        cta: {
          aria: 'Llamada a la acción',
          title: '¿Quieres un resultado similar?',
          lead: 'Comparte tus objetivos y IDSWIFT preparará un plan a medida con proyecciones.',
          action: 'Habla con el equipo',
        },
      },
      contact: {
        meta: {
          title: 'IDSWIFT | Contacto',
          description: 'Contacta con el equipo de IDSWIFT para definir tu hoja de ruta de automatización del check-in hotelero.',
        },
        header: {
          aria: 'Encabezado de contacto',
          title: 'Contacto',
          intro: 'Cuéntanos sobre tus propiedades, stack PMS y objetivos de experiencia. El equipo de IDSWIFT responde en 24-48 horas laborables.',
        },
      },
      privacy: {
        meta: {
          title: 'IDSWIFT | Privacidad',
          description: 'Consulta el aviso de privacidad de IDSWIFT, el tratamiento de datos y las preferencias de cookies.',
        },
        header: {
          aria: 'Encabezado de privacidad',
          title: 'Aviso de privacidad',
          intro: 'IDSWIFT trata los datos de los huéspedes con el mismo cuidado que los equipos de hospitality ponen en su servicio.',
        },
        summary: {
          aria: 'Detalles de privacidad',
          title: 'Resumen del tratamiento de datos',
          intro: 'Este resumen explica quién trata tu información, para qué lo hacemos y cómo la protegemos.',
          cards: [
            {
              sections: [
                {
                  title: 'Responsable del tratamiento',
                  body: 'IDSWIFT Labs, S.L. - CIF ESB12345678 - Calle Ejemplo 12, 28000 Madrid (España). Correo: <a href="mailto:privacy@idswift.com">privacy@idswift.com</a>',
                },
                {
                  title: 'Finalidad',
                  body: 'Prestar la plataforma de check-in hotelero, dar de alta usuarios, gestionar soporte y enviar comunicaciones de servicio.',
                },
                {
                  title: 'Base jurídica',
                  body: 'Interés legítimo, ejecución contractual y consentimiento expreso cuando sea necesario (por ejemplo, marketing).',
                },
                {
                  title: 'Conservación',
                  body: 'Conservamos los datos personales mientras sea necesario para prestar el servicio y cumplir obligaciones legales. Después los bloqueamos según los plazos legales.',
                },
              ],
            },
            {
              sections: [
                {
                  title: 'Destinatarios',
                  body: 'Proveedores que facilitan hosting, mensajería, analítica y soporte. Nunca vendemos datos y solo los compartimos cuando es imprescindible o por obligación legal.',
                },
                {
                  title: 'Transferencias internacionales',
                  body: 'Si transferimos datos fuera de la UE/EEE, aplicamos garantías como Cláusulas Contractuales Tipo o mecanismos de certificación aprobados.',
                },
                {
                  title: 'Derechos',
                  body: 'Puedes acceder, rectificar, suprimir, oponerte, limitar u obtener una copia portátil de tus datos. Escribe a <a href="mailto:privacy@idswift.com">privacy@idswift.com</a> o presenta una reclamación ante la AEPD.',
                },
                {
                  title: 'Cookies',
                  body: 'Utilizamos cookies estrictamente necesarias y cookies analíticas opcionales. Puedes gestionar tu consentimiento en cualquier momento desde este sitio.',
                },
              ],
            },
            {
              sections: [
                {
                  title: 'Seguridad',
                  body: 'Cifrado TLS, controles de acceso, registros, copias de seguridad periódicas y due diligence a proveedores protegen tu información.',
                },
                {
                  title: 'Contacto del DPO',
                  body: 'Si nombramos un Delegado de Protección de Datos, podrás contactar en <a href="mailto:dpo@idswift.com">dpo@idswift.com</a>.',
                },
                {
                  title: 'Actualizaciones',
                  body: 'Actualizaremos este aviso cuando cambie la forma en la que tratamos datos. Última revisión: <span id="policyDate"></span>.',
                },
                {
                  title: '¿Necesitas un DPA firmado?',
                  body: 'Contacta con nuestro equipo legal para solicitar un contrato de encargado adaptado a tu organización.',
                },
              ],
            },
          ],
        },
        cookies: {
          aria: 'Preferencias de cookies',
          title: 'Categorías de cookies',
          cards: [
            {
              title: 'Estrictamente necesarias',
              body: 'Son imprescindibles para sesiones de inicio, preferencias de idioma y peticiones seguras. No se pueden desactivar.',
            },
            {
              title: 'Analítica',
              body: 'Nos ayudan a entender el uso y mejorar los flujos. Solo se activan con tu consentimiento expreso.',
            },
            {
              title: 'Marketing',
              body: 'Se usan ocasionalmente para novedades de producto o remarketing. Permanecen desactivadas salvo que optes por ellas.',
            },
          ],
        },
      },
    },
  };

  const supported = Object.keys(translations);
  const fallbackLang = 'en';
  const storageKey = 'idswift-lang';
  let currentLang = fallbackLang;
  const listeners = new Set();

  const getNestedValue = (lang, key) => {
    const dictionary = translations[lang];
    if (!dictionary) return undefined;
    return key.split('.').reduce((accumulator, part) => {
      if (accumulator && Object.prototype.hasOwnProperty.call(accumulator, part)) {
        return accumulator[part];
      }
      return undefined;
    }, dictionary);
  };

  const resolveKey = (key, lang) => {
    const value = getNestedValue(lang, key);
    if (value !== undefined) {
      return value;
    }
    if (lang !== fallbackLang) {
      return getNestedValue(fallbackLang, key);
    }
    return undefined;
  };

  const normaliseAttrList = (attrList) => {
    if (!attrList) return ['text'];
    return attrList
      .split(',')
      .map((attr) => attr.trim())
      .filter(Boolean);
  };

  const applyToElement = (element, lang) => {
    const key = element.getAttribute('data-i18n');
    if (!key) return;
    const value = resolveKey(key, lang);
    if (value === undefined) return;
    const attrs = normaliseAttrList(element.getAttribute('data-i18n-attr'));
    attrs.forEach((attr) => {
      if (attr === 'text') {
        element.innerHTML = value;
      } else {
        element.setAttribute(attr, value);
      }
    });
  };

  const applyLanguage = (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      applyToElement(element, lang);
    });
    listeners.forEach((callback) => {
      try {
        callback(lang);
      } catch (error) {
        console.error('Error in language change listener', error);
      }
    });
  };

  const isSupported = (lang) => supported.includes(lang);

  const chooseInitialLanguage = () => {
    const stored = localStorage.getItem(storageKey);
    if (stored && isSupported(stored)) {
      return stored;
    }
    const browser = navigator.language || navigator.userLanguage;
    if (browser) {
      const candidate = browser.slice(0, 2).toLowerCase();
      if (isSupported(candidate)) {
        return candidate;
      }
    }
    return fallbackLang;
  };

  const setLanguage = (lang, { persist = true } = {}) => {
    const target = isSupported(lang) ? lang : fallbackLang;
    if (target === currentLang) {
      return currentLang;
    }
    currentLang = target;
    applyLanguage(currentLang);
    if (persist) {
      localStorage.setItem(storageKey, currentLang);
    }
    return currentLang;
  };

  const getLanguage = () => currentLang;

  const onLanguageChange = (callback) => {
    if (typeof callback !== 'function') return () => undefined;
    listeners.add(callback);
    return () => listeners.delete(callback);
  };

  const translate = (key, lang = currentLang) => {
    const value = resolveKey(key, lang);
    if (Array.isArray(value)) {
      return value.slice();
    }
    return value !== undefined ? value : key;
  };

  const init = () => {
    const initialLang = chooseInitialLanguage();
    currentLang = initialLang;
    applyLanguage(currentLang);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.I18N = {
    translations,
    getLanguage,
    setLanguage,
    onLanguageChange,
    t: translate,
    supported: () => supported.slice(),
  };
})();
