import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ROUTES = ['/', '/rooms', '/gallery', '/contact', '/map', '/reviews', '/booking'];

const MIN_SWIPE_X = 60;   // px горизонтально
const MAX_SWIPE_Y = 80;   // px вертикально (чтобы отличить от скролла)

export default function useSwipeNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const touch = useRef(null);

  useEffect(() => {
    function onStart(e) {
      const t = e.touches ? e.touches[0] : null;
      if (!t) return;
      touch.current = { x: t.clientX, y: t.clientY };
    }

    function onEnd(e) {
      if (!touch.current) return;
      const t = e.changedTouches ? e.changedTouches[0] : null;
      if (!t) return;

      const dx = t.clientX - touch.current.x;
      const dy = t.clientY - touch.current.y;
      touch.current = null;

      // Ignore mostly-vertical swipes (user is scrolling)
      if (Math.abs(dy) > MAX_SWIPE_Y) return;
      if (Math.abs(dx) < MIN_SWIPE_X) return;

      const idx = ROUTES.indexOf(pathname);
      if (idx === -1) return;

      if (dx < 0 && idx < ROUTES.length - 1) {
        // swipe left → next page
        navigate(ROUTES[idx + 1]);
      } else if (dx > 0 && idx > 0) {
        // swipe right → prev page
        navigate(ROUTES[idx - 1]);
      }
    }

    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [pathname, navigate]);
}
