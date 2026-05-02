export function initGallery({ body, lightbox, lightboxImage, lightboxClose, galleryItems }) {
  if (!body || !lightbox || !lightboxImage || !lightboxClose || !galleryItems) return;

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    body.style.overflow = '';
  }

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
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
}
