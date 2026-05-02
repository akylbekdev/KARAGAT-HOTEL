(function () {
  const body = document.body;
  const loader = document.getElementById('pageLoader');
  const themeToggle = document.getElementById('themeToggle');
  const toTop = document.getElementById('toTop');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');
  const bookingForm = document.getElementById('bookingForm');
  const formMessage = document.getElementById('formMessage');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  const THEME_KEY = 'karagatTheme';
  const BOOKINGS_KEY = 'karagatBookings';

  function getJson(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  }

  function setJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function renderThemeIcon(isDark) {
    if (!themeToggle) return;
    themeToggle.innerHTML = isDark
      ? '<i class="fa-regular fa-sun"></i>'
      : '<i class="fa-regular fa-moon"></i>';
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    renderThemeIcon(true);
  }

  window.addEventListener('load', () => {
    if (loader) {
      setTimeout(() => loader.classList.add('hidden'), 500);
    }
  });

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');
      const isDark = body.classList.contains('dark');
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
      renderThemeIcon(isDark);
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  if (toTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 420) {
        toTop.classList.add('visible');
      } else {
        toTop.classList.remove('visible');
      }
    });

    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
      revealObserver.observe(item);
    });
  } else {
    reveals.forEach((item) => item.classList.add('visible'));
  }

  if (bookingForm && formMessage) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(bookingForm);
      const data = Object.fromEntries(formData.entries());

      if (!data.name || !data.phone || !data.checkin || !data.checkout || !data.guests) {
        formMessage.textContent = 'Пожалуйста, заполните все поля.';
        formMessage.className = 'form-message error';
        return;
      }

      if (new Date(data.checkout) <= new Date(data.checkin)) {
        formMessage.textContent = 'Дата выезда должна быть позже даты заезда.';
        formMessage.className = 'form-message error';
        return;
      }

      const bookings = getJson(BOOKINGS_KEY, []);
      bookings.push({ ...data, createdAt: new Date().toISOString() });
      setJson(BOOKINGS_KEY, bookings);

      bookingForm.reset();
      formMessage.textContent = 'Бронь отправлена';
      formMessage.className = 'form-message success';
    });
  }

  const galleryItems = document.querySelectorAll('.gallery-item');
  function closeLightbox() {
    if (!lightbox || !lightboxImage) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    body.style.overflow = '';
  }

  if (lightbox && lightboxImage && lightboxClose) {
    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const fullImageUrl = item.getAttribute('data-full');
        if (!fullImageUrl) return;
        lightboxImage.src = fullImageUrl;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        body.style.overflow = 'hidden';
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
})();
