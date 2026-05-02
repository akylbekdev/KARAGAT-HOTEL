export function getDomNodes() {
  return {
    body: document.body,
    loader: document.getElementById('pageLoader'),
    themeToggle: document.getElementById('themeToggle'),
    toTop: document.getElementById('toTop'),
    menuToggle: document.getElementById('menuToggle'),
    nav: document.getElementById('mainNav'),
    bookingForm: document.getElementById('bookingForm'),
    formMessage: document.getElementById('formMessage'),
    lightbox: document.getElementById('lightbox'),
    lightboxImage: document.getElementById('lightboxImage'),
    lightboxClose: document.getElementById('lightboxClose'),
    reveals: document.querySelectorAll('.reveal'),
    galleryItems: document.querySelectorAll('.gallery-item')
  };
}
