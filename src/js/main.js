import { getDomNodes } from './config/selectors.js';
import { initLoader } from './modules/loader.js';
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initScrollTop } from './modules/scrollTop.js';
import { initRevealAnimation } from './modules/reveal.js';
import { initBooking } from './modules/booking.js';
import { initGallery } from './modules/gallery.js';

function bootstrap() {
  const dom = getDomNodes();

  initLoader(dom.loader);
  initTheme({ body: dom.body, themeToggle: dom.themeToggle });
  initNavigation({ menuToggle: dom.menuToggle, nav: dom.nav });
  initScrollTop(dom.toTop);
  initRevealAnimation(dom.reveals);
  initBooking({ bookingForm: dom.bookingForm, formMessage: dom.formMessage });
  initGallery({
    body: dom.body,
    lightbox: dom.lightbox,
    lightboxImage: dom.lightboxImage,
    lightboxClose: dom.lightboxClose,
    galleryItems: dom.galleryItems
  });
}

bootstrap();
