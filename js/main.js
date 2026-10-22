/**
 * Автоелектрика Львів · Ремонт стартерів та генераторів
 * Clean Interactive JavaScript for GitHub Pages
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScheduleStatus();
  initSymptomCards();
  initScrollSpy();
  initBackToTop();
});

/* ========================================================
   Header scroll effects
   ======================================================== */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ========================================================
   Mobile Menu Drawer
   ======================================================== */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const drawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ========================================================
   Working Hours Live Status
   ======================================================== */
function initScheduleStatus() {
  const badge = document.getElementById('live-schedule-badge');
  if (!badge) return;

  const updateStatus = () => {
    // Current time in Ukraine (Europe/Kyiv)
    const now = new Date();
    const options = { timeZone: 'Europe/Kyiv', hour: 'numeric', minute: 'numeric', weekday: 'short', hour12: false };
    const formatter = new Intl.DateTimeFormat([], options);
    const parts = formatter.formatToParts(now);
    
    let hour = 0;
    let day = now.getDay(); // 0 is Sunday, 1 is Monday ... 6 is Saturday

    parts.forEach(p => {
      if (p.type === 'hour') hour = parseInt(p.value, 10);
    });

    let isOpen = false;
    let text = 'Зараз зачинено';

    if (day >= 1 && day <= 5) {
      // Mon - Fri: 10:00 - 18:00
      if (hour >= 10 && hour < 18) {
        isOpen = true;
        text = 'Зараз відкрито · до 18:00';
      } else {
        text = 'Зараз зачинено · Відкриття о 10:00';
      }
    } else if (day === 6) {
      // Sat: 10:00 - 14:00
      if (hour >= 10 && hour < 14) {
        isOpen = true;
        text = 'Зараз відкрито · до 14:00';
      } else {
        text = 'Зараз зачинено · Сб до 14:00';
      }
    } else {
      // Sun: Closed
      text = 'Сьогодні вихідний · Відкриття в Пн о 10:00';
    }

    badge.textContent = text;
    badge.className = 'schedule-badge ' + (isOpen ? 'schedule-open' : 'schedule-closed');
  };

  updateStatus();
  setInterval(updateStatus, 60000);
}

/* ========================================================
   Interactive Symptom Cards
   ======================================================== */
function initSymptomCards() {
  const cards = document.querySelectorAll('.symptom-card');
  const contactsSection = document.getElementById('contacts');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (contactsSection) {
        contactsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ========================================================
   Scroll Spy for Active Navigation
   ======================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ========================================================
   Back to Top Button
   ======================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  const onScroll = () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

