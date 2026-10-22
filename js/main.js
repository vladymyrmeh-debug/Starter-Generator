/**
 * BVV · Ремонт стартерів та генераторів у Львові
 * Interactive JavaScript for GitHub Pages
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScheduleStatus();
  initSymptomCards();
  initBookingForm();
  initSlideMode();
  initScrollSpy();
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
    // Current time in Ukraine (EET / EEST)
    const now = new Date();
    // Use Intl for timezone accuracy
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
      text = 'Сьогодні вихідний · Відкриття в пн о 10:00';
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
  const symptomInput = document.getElementById('form-symptom');
  const bookingSection = document.getElementById('contacts');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.symptom-title')?.textContent || '';
      if (symptomInput) {
        symptomInput.value = title.trim();
        if (bookingSection) {
          bookingSection.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => symptomInput.focus(), 600);
        }
      }
    });
  });
}

/* ========================================================
   Booking Form (Direct WhatsApp / Telegram / Call)
   ======================================================== */
function initBookingForm() {
  const form = document.getElementById('diagnostic-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = document.getElementById('form-phone')?.value.trim();
    const name = document.getElementById('form-name')?.value.trim();
    const symptom = document.getElementById('form-symptom')?.value.trim();

    if (!phone) {
      alert('Будь ласка, вкажіть ваш номер телефону');
      return;
    }

    const message = encodeURIComponent(
      `Добрий день! Запис на діагностику (стартер/генератор).\nІм'я: ${name || 'Клієнт'}\nТелефон: ${phone}\nСимптом: ${symptom || 'Потрібна перевірка'}`
    );

    // Provide options to user: Telegram or Viber or Call
    const choice = confirm(
      `Дякуємо! Надіслати заявку у Telegram/Viber майстру?\n\nТелефон: ${phone}\nСимптом: ${symptom || 'Перевірка'}\n\nНатисніть OK для переходу або зателефонуйте напряму: +380688379656`
    );

    if (choice) {
      // Try opening Telegram or phone
      window.open(`https://t.me/share/url?url=${encodeURIComponent('+380688379656')}&text=${message}`, '_blank');
    }
  });
}

/* ========================================================
   Slide Mode / Presentation Mode (16:9 like PDF)
   ======================================================== */
function initSlideMode() {
  const toggleBtn = document.getElementById('toggle-slide-mode');
  const slides = document.querySelectorAll('.presentation-slide');
  const controls = document.getElementById('slide-controls');
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');
  const counter = document.getElementById('slide-counter');

  let currentSlide = 0;
  let isSlideMode = false;

  const updateSlideView = () => {
    slides.forEach((s, idx) => {
      s.classList.toggle('active-slide', idx === currentSlide);
    });
    if (counter) {
      counter.textContent = `${currentSlide + 1} / ${slides.length}`;
    }
  };

  const setSlideMode = (enable) => {
    isSlideMode = enable;
    document.body.classList.toggle('slide-mode', enable);
    if (toggleBtn) {
      toggleBtn.innerHTML = enable 
        ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg> Вийти зі слайдів`
        : `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg> Режим слайдів`;
    }
    if (enable) {
      updateSlideView();
    }
  };

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      setSlideMode(!isSlideMode);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlideView();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlideView();
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!isSlideMode) return;
    if (e.key === 'ArrowRight' || e.key === 'Space') {
      if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSlideView();
      }
    } else if (e.key === 'ArrowLeft') {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlideView();
      }
    } else if (e.key === 'Escape') {
      setSlideMode(false);
    }
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
    const scrollPos = window.scrollY + 120;

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
