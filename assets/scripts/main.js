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
  const menuToggle = $('.menu-toggle');
  const navActions = $('.nav-actions');
  const menuToggleText = menuToggle ? $('.menu-toggle__text', menuToggle) : null;
  const mobileMedia = typeof window.matchMedia === 'function' ? window.matchMedia('(max-width: 900px)') : null;
  const heroVideo = $('.hero-video');

  const isMobileView = () => {
    if (mobileMedia) {
      return mobileMedia.matches;
    }
    return window.innerWidth <= 900;
  };

  const setMenuState = (expanded) => {
    if (!menuToggle || !navActions) return;
    const mobile = isMobileView();
    const nextExpanded = mobile && expanded;
    menuToggle.setAttribute('aria-expanded', String(nextExpanded));
    menuToggle.classList.toggle('is-active', nextExpanded);
    navActions.classList.toggle('is-open', nextExpanded);
    navActions.setAttribute('aria-hidden', mobile ? (nextExpanded ? 'false' : 'true') : 'false');

    const labelKey = nextExpanded ? 'common.nav.menuToggle.close' : 'common.nav.menuToggle.open';
    const ariaKey = nextExpanded ? 'common.nav.menuToggle.ariaClose' : 'common.nav.menuToggle.ariaOpen';

    if (menuToggleText) {
      menuToggleText.setAttribute('data-i18n', labelKey);
      menuToggleText.textContent = translate(labelKey);
    }

    menuToggle.setAttribute('data-i18n', ariaKey);
    menuToggle.setAttribute('aria-label', translate(ariaKey));
  };

  if (menuToggle && navActions) {
    const closeMenu = () => setMenuState(false);

    setMenuState(false);

    menuToggle.addEventListener('click', () => {
      if (!isMobileView()) return;
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      setMenuState(!expanded);
    });

    [...$$('.nav-actions a'), ...$$('.nav-actions .lang-btn')].forEach((element) => {
      element.addEventListener('click', () => {
        if (isMobileView()) {
          closeMenu();
        }
      });
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        menuToggle.focus();
      }
    });

    const handleViewportChange = () => {
      closeMenu();
    };

    if (mobileMedia) {
      if (typeof mobileMedia.addEventListener === 'function') {
        mobileMedia.addEventListener('change', handleViewportChange);
      } else if (typeof mobileMedia.addListener === 'function') {
        mobileMedia.addListener(handleViewportChange);
      }
    } else {
      window.addEventListener('resize', handleViewportChange);
    }
  }

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
  const settingsCookies = $('#cookie-settings');
  const settingsPanel = $('#cookie-settings-panel');
  const analyticsToggle = $('#cookie-analytics');
  const saveCookies = $('#cookie-save');
  const cancelCookies = $('#cookie-cancel');

  const parseConsent = (value) => {
    if (!value) return null;
    if (value === 'true') return { analytics: true };
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === 'object') return parsed;
    } catch (error) {
      console.warn('Invalid consent value', error);
    }
    return null;
  };

  const storeConsent = (value) => {
    localStorage.setItem('cookieConsent', JSON.stringify(value));
  };

  if (cookieBar && acceptCookies) {
    const consent = parseConsent(localStorage.getItem('cookieConsent'));

    if (!consent) {
      cookieBar.classList.add('show');
    } else if (analyticsToggle) {
      analyticsToggle.checked = Boolean(consent.analytics);
    }

    const openSettings = () => {
      cookieBar.classList.add('show', 'is-configuring');
      if (settingsPanel) settingsPanel.hidden = false;
      if (analyticsToggle) {
        const latestConsent = parseConsent(localStorage.getItem('cookieConsent'));
        analyticsToggle.checked = latestConsent ? Boolean(latestConsent.analytics) : false;
      }
    };

    const closeSettings = () => {
      cookieBar.classList.remove('is-configuring');
      if (settingsPanel) settingsPanel.hidden = true;
    };

    acceptCookies.addEventListener('click', () => {
      storeConsent({ analytics: true });
      cookieBar.classList.remove('show');
      closeSettings();
    });

    if (settingsCookies) {
      settingsCookies.addEventListener('click', openSettings);
    }

    if (saveCookies) {
      saveCookies.addEventListener('click', () => {
        const analyticsOptIn = analyticsToggle ? analyticsToggle.checked : false;
        storeConsent({ analytics: analyticsOptIn });
        cookieBar.classList.remove('show');
        closeSettings();
      });
    }

    if (cancelCookies) {
      cancelCookies.addEventListener('click', () => {
        closeSettings();
      });
    }
  }

  const handleFirstTab = (event) => {
    if (event.key === 'Tab') {
      document.body.classList.add('user-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  };

  window.addEventListener('keydown', handleFirstTab);

  if (heroVideo) {
    const attachMidRestart = () => {
      const duration = heroVideo.duration;
      if (!duration || Number.isNaN(duration)) return;
      const halfway = duration / 2;
      let resetting = false;
      heroVideo.addEventListener('timeupdate', () => {
        if (resetting) return;
        if (heroVideo.currentTime >= halfway) {
          resetting = true;
          heroVideo.pause();
          heroVideo.currentTime = 0;
          heroVideo.play().catch(() => {});
          resetting = false;
        }
      });
    };

    if (heroVideo.readyState >= 1) {
      attachMidRestart();
    } else {
      heroVideo.addEventListener('loadedmetadata', attachMidRestart, { once: true });
    }
  }

  const navLinks = $$('#site-navigation a[href^="#"]');
  const scrollToSection = (id, block = 'start') => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block });
  };

  const setActiveNav = (targetId) => {
    if (!navLinks.length) return;
    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const hash = href.startsWith('#') ? href.slice(1) : '';
      const isActive = hash && hash === targetId;
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  if (navLinks.length) {
    navLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href') || '';
        if (href.startsWith('#')) {
          event.preventDefault();
          const id = href.slice(1);
          scrollToSection(id, 'start');
          setActiveNav(id);
          history.replaceState(null, '', `#${id}`);
        }
      });
    });

    if ('IntersectionObserver' in window) {
      const sectionMap = new Map();
      navLinks.forEach((link) => {
        const href = link.getAttribute('href') || '';
        if (!href.startsWith('#')) return;
        const id = href.slice(1);
        const section = document.getElementById(id);
        if (section) {
          sectionMap.set(id, section);
        }
      });

      if (sectionMap.size) {
        const observer = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((entry) => entry.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
            if (visible.length) {
              setActiveNav(visible[0].target.id);
            }
          },
          {
            rootMargin: '-40% 0px -40% 0px',
            threshold: [0.25, 0.5, 0.75, 1],
          }
        );

        sectionMap.forEach((section) => observer.observe(section));
      }
    }

    const applyHashScroll = () => {
      const hashId = window.location.hash ? window.location.hash.slice(1) : '';
      if (hashId) {
        scrollToSection(hashId, 'start');
        setActiveNav(hashId);
      }
    };

    requestAnimationFrame(() => {
      if (window.location.hash) {
        applyHashScroll();
      } else {
        const firstHref = navLinks[0].getAttribute('href') || '';
        if (firstHref.startsWith('#')) {
          setActiveNav(firstHref.slice(1));
        }
      }
    });

    window.addEventListener('hashchange', applyHashScroll);
  }

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
