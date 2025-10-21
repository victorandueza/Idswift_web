const $ = (selector, root = document) => root.querySelector(selector);

const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

document.addEventListener('DOMContentLoaded', () => {
  const i18n = window.I18N;
  const translate = (key) => (i18n ? i18n.t(key) : key);

  const yearEl = $('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const policyDateEl = $('#policyDate');
  if (policyDateEl) {
    policyDateEl.textContent = new Date().toISOString().slice(0, 10);
  }

  const form = $('#contactForm');
  const statusEl = $('#formStatus');
  const submitBtn = $('#submitBtn');

  const showStatus = (type, key) => {
    if (!statusEl) return;
    statusEl.className = type ? `status ${type}` : 'status';
    if (key) {
      statusEl.setAttribute('data-i18n', key);
      statusEl.textContent = translate(key);
    } else {
      statusEl.removeAttribute('data-i18n');
      statusEl.textContent = '';
    }
  };

  const setButtonState = (state) => {
    if (!submitBtn) return;
    const key = state === 'sending' ? 'common.forms.contact.actions.sending' : 'common.forms.contact.actions.send';
    submitBtn.setAttribute('data-i18n', key);
    submitBtn.textContent = translate(key);
  };

  setButtonState('idle');

  const validate = () => {
    const name = $('#name')?.value.trim() ?? '';
    const email = $('#email')?.value.trim() ?? '';
    const message = $('#message')?.value.trim() ?? '';
    const consent = $('#consent')?.checked ?? false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) return [false, 'common.forms.contact.validation.name'];
    if (!emailPattern.test(email)) return [false, 'common.forms.contact.validation.email'];
    if (message.length < 10) return [false, 'common.forms.contact.validation.message'];
    if (!consent) return [false, 'common.forms.contact.validation.consent'];
    return [true, ''];
  };

  if (form && statusEl && submitBtn) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const [ok, reason] = validate();
      if (!ok) {
        showStatus('err', reason);
        return;
      }

      const action = $('#ACTION_URL')?.value.trim();
      if (!action) {
        showStatus('err', 'common.forms.contact.status.configure');
        return;
      }

      submitBtn.disabled = true;
      setButtonState('sending');
      showStatus('', '');

      try {
        const response = await fetch(action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: $('#name')?.value.trim(),
            email: $('#email')?.value.trim(),
            message: $('#message')?.value.trim(),
            source: 'landing-contact',
          }),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        showStatus('ok', 'common.forms.contact.status.success');
        form.reset();
      } catch (error) {
        console.error(error);
        showStatus('err', 'common.forms.contact.status.error');
      } finally {
        submitBtn.disabled = false;
        setButtonState('idle');
      }
    });
  }

  const cookieBar = $('#cookiebar');
  const acceptCookies = $('#cookie-accept');

  if (cookieBar && acceptCookies) {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      cookieBar.classList.add('show');
    }

    acceptCookies.addEventListener('click', () => {
      localStorage.setItem('cookieConsent', 'true');
      cookieBar.classList.remove('show');
    });
  }

  const handleFirstTab = (event) => {
    if (event.key === 'Tab') {
      document.body.classList.add('user-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  };

  window.addEventListener('keydown', handleFirstTab);

  if (i18n) {
    const updateButtonLang = (lang) => {
      const currentKey = submitBtn?.getAttribute('data-i18n');
      if (submitBtn && currentKey) {
        submitBtn.textContent = translate(currentKey);
      }
      if (statusEl && statusEl.hasAttribute('data-i18n')) {
        const key = statusEl.getAttribute('data-i18n');
        if (key) {
          statusEl.textContent = translate(key);
        }
      }
      $$('.lang-btn').forEach((button) => {
        const targetLang = button.getAttribute('data-lang');
        const isActive = targetLang === lang;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
    };

    $$('.lang-btn').forEach((button) => {
      const targetLang = button.getAttribute('data-lang');
      if (!targetLang) return;
      button.addEventListener('click', () => {
        i18n.setLanguage(targetLang);
      });
    });

    i18n.onLanguageChange(updateButtonLang);
    updateButtonLang(i18n.getLanguage());
  }
});
