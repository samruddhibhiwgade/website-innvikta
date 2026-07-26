'use strict';

// ── NAVBAR SCROLL STATE ────────────────────────────────────
(function () {
  const nav = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      hamburger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }
})();

// ── HERO COUNTER ANIMATION ─────────────────────────────────
(function () {
  const el = document.querySelector('.meta-value[data-count]');
  if (!el) return;

  const target = parseInt(el.dataset.count, 10);
  let started = false;

  const run = () => {
    if (started) return;
    started = true;
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // Ease-out quart
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString();
    };
    requestAnimationFrame(tick);
  };

  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { run(); obs.disconnect(); }
  }, { threshold: 0.6 });

  obs.observe(el);
})();

// ── WEEKS STEPPER ──────────────────────────────────────────
(function () {
  const tabs   = document.querySelectorAll('.step-tab');
  const panels = document.querySelectorAll('.week-panel');

  if (!tabs.length) return;

  function activate(index) {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    panels.forEach((panel, i) => {
      panel.classList.toggle('active', i === index);
    });
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(i));

    // Keyboard navigation
    tab.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        activate((i + 1) % tabs.length);
        tabs[(i + 1) % tabs.length].focus();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        activate((i - 1 + tabs.length) % tabs.length);
        tabs[(i - 1 + tabs.length) % tabs.length].focus();
      }
    });
  });
})();

// ── OFFERINGS REVEAL ───────────────────────────────────────
(function () {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        // Stagger
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, 60 * Array.from(items).indexOf(entry.target));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  items.forEach(item => obs.observe(item));
})();

// ── COUNTDOWN TIMER ────────────────────────────────────────
(function () {
  const target   = new Date('2026-10-01T00:00:00');
  const daysEl   = document.getElementById('days');
  const hoursEl  = document.getElementById('hours');
  const minsEl   = document.getElementById('minutes');
  const secsEl   = document.getElementById('seconds');

  if (!daysEl) return;

  const pad = n => String(Math.max(0, n)).padStart(2, '0');

  function tick() {
    const diff = target - Date.now();
    if (diff <= 0) {
      [daysEl, hoursEl, minsEl, secsEl].forEach(el => el.textContent = '00');
      return;
    }
    daysEl.textContent  = pad(Math.floor(diff / 86400000));
    hoursEl.textContent = pad(Math.floor((diff % 86400000) / 3600000));
    minsEl.textContent  = pad(Math.floor((diff % 3600000)  / 60000));
    secsEl.textContent  = pad(Math.floor((diff % 60000)    / 1000));
  }

  tick();
  setInterval(tick, 1000);
})();

// ── FORM VALIDATION & SUBMIT ───────────────────────────────
(function () {
  const form    = document.getElementById('registerForm');
  if (!form) return;

  const submitBtn   = document.getElementById('submitBtn');
  const btnLabel    = document.getElementById('btnLabel');
  const btnSpinner  = document.getElementById('btnSpinner');
  const successScreen = document.getElementById('successScreen');

  // Field refs
  const fields = {
    firstName:  { el: document.getElementById('firstName'),  err: document.getElementById('errFirstName') },
    lastName:   { el: document.getElementById('lastName'),   err: document.getElementById('errLastName') },
    workEmail:  { el: document.getElementById('workEmail'),  err: document.getElementById('errWorkEmail') },
    company:    { el: document.getElementById('company'),    err: document.getElementById('errCompany') },
    consent:    { el: document.getElementById('consent'),    err: document.getElementById('errConsent') },
  };

  // Clear on change
  Object.values(fields).forEach(({ el, err }) => {
    if (!el) return;
    const event = el.type === 'checkbox' ? 'change' : 'input';
    el.addEventListener(event, () => {
      el.classList.remove('is-error');
      if (err) err.textContent = '';
    });
  });

  function setError(key, msg) {
    const { el, err } = fields[key];
    if (el && el.type !== 'checkbox') el.classList.add('is-error');
    if (err) err.textContent = msg;
  }

  function validate() {
    let ok = true;

    // First name
    const fn = fields.firstName.el.value.trim();
    if (!fn) { setError('firstName', 'First name is required.'); ok = false; }
    else if (fn.length < 2) { setError('firstName', 'Too short.'); ok = false; }

    // Last name
    const ln = fields.lastName.el.value.trim();
    if (!ln) { setError('lastName', 'Last name is required.'); ok = false; }

    // Email
    const em = fields.workEmail.el.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!em) { setError('workEmail', 'Work email is required.'); ok = false; }
    else if (!emailRe.test(em)) { setError('workEmail', 'Enter a valid email address.'); ok = false; }

    // Company
    const co = fields.company.el.value.trim();
    if (!co) { setError('company', 'Organisation name is required.'); ok = false; }

    // Consent
    if (!fields.consent.el.checked) {
      setError('consent', 'Please agree to receive campaign updates.');
      ok = false;
    }

    return ok;
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    if (!validate()) return;

    // Loading state
    btnLabel.style.display  = 'none';
    btnSpinner.style.display = 'inline';
    submitBtn.disabled = true;

    // Retrieve input values
    const fn = fields.firstName.el.value.trim();
    const ln = fields.lastName.el.value.trim();
    const em = fields.workEmail.el.value.trim();
    const co = fields.company.el.value.trim();

    try {
      const res = await fetch("/api/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_type: "Cybersecurity Awareness Month Kit",
          name: `${fn} ${ln}`,
          email: em,
          company: co
        })
      });
      
      const data = await res.json();
      if (data.success) {
        // Show success
        successScreen.classList.add('is-active');
        successScreen.focus?.();
        form.reset();
      } else {
        alert("Submission failed: " + (data.error || "Please try again."));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again later.");
    } finally {
      btnLabel.style.display  = 'inline';
      btnSpinner.style.display = 'none';
      submitBtn.disabled = false;
    }
  });
})();

// ── SUCCESS CLOSE ──────────────────────────────────────────
function closeSuccess() {
  const screen = document.getElementById('successScreen');
  if (screen) screen.classList.remove('is-active');
}

// ── SMOOTH SCROLL ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navH = document.querySelector('.navbar')?.offsetHeight ?? 80;
    const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── HERO CARD HOVER PARALLAX ───────────────────────────────
(function () {
  const stack = document.querySelector('.hero-card-stack');
  if (!stack) return;

  const front = stack.querySelector('.hcard--front');
  const mid   = stack.querySelector('.hcard--mid');
  const back  = stack.querySelector('.hcard--back');

  stack.addEventListener('mousemove', e => {
    const rect = stack.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy = (e.clientY - rect.top)  / rect.height - 0.5;

    if (front) front.style.transform = `perspective(600px) rotateY(${cx * 6}deg) rotateX(${-cy * 4}deg)`;
    if (mid)   mid.style.transform   = `perspective(600px) rotateY(${cx * 3}deg) rotateX(${-cy * 2}deg)`;
    if (back)  back.style.transform  = `perspective(600px) rotateY(${cx * 1.5}deg) rotateX(${-cy * 1}deg)`;
  });

  stack.addEventListener('mouseleave', () => {
    [front, mid, back].forEach(el => {
      if (el) el.style.transform = '';
    });
  });
})();
