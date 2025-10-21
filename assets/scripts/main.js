const $ = (selector, root = document) => root.querySelector(selector);

const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

document.addEventListener('DOMContentLoaded', () => {
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

  const showStatus = (type, message) => {
    if (!statusEl) return;
    statusEl.className = type ? `status ${type}` : 'status';
    statusEl.textContent = message || '';
  };

  const validate = () => {
    const name = $('#name')?.value.trim() ?? '';
    const email = $('#email')?.value.trim() ?? '';
    const message = $('#message')?.value.trim() ?? '';
    const consent = $('#consent')?.checked ?? false;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) return [false, 'Please enter your name.'];
    if (!emailPattern.test(email)) return [false, 'Please enter a valid email address.'];
    if (message.length < 10) return [false, 'Tell us a little more about your project (min. 10 characters).'];
    if (!consent) return [false, 'You must accept the privacy policy.'];
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
        showStatus('err', 'Configure the form ACTION_URL before going live.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
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
        showStatus('ok', 'Thanks! We will be in touch very soon.');
        form.reset();
      } catch (error) {
        console.error(error);
        showStatus('err', 'Something went wrong. Try again in a few minutes.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
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
});
