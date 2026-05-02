import { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ROUTES = ["/", "/rooms", "/gallery", "/contact", "/map", "/reviews", "/booking"];
const RESIST = 0.18; // сопротивление на краях

export default function SwipePages({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const wrapRef  = useRef(null);
  const stateRef = useRef({
    sum: 0,          // накопленный сдвиг
    lastDeltaX: 0,   // скорость последнего события
    fired: false,    // уже сработало
    timer: null,
  });
  const lockedRef = useRef(false);

  const [offset, setOffset]   = useState(0);
  const [animate, setAnimate] = useState(false);

  // Сброс при смене страницы
  useEffect(() => {
    setOffset(0);
    setAnimate(false);
    const s = stateRef.current;
    s.sum = 0; s.fired = false; clearTimeout(s.timer);
    setTimeout(() => { lockedRef.current = false; }, 300);
  }, [pathname]);

  const goTo = useCallback((dir) => {
    if (lockedRef.current) return;
    const idx = ROUTES.indexOf(pathname);
    const next = idx + dir;
    if (next < 0 || next >= ROUTES.length) {
      setAnimate(true); setOffset(0); return;
    }
    lockedRef.current = true;
    setAnimate(true);
    setOffset(dir > 0 ? -window.innerWidth : window.innerWidth);
    setTimeout(() => navigate(ROUTES[next]), 220);
  }, [pathname, navigate]);

  // ── ТАЧПАД (ОТКЛЮЧЕНО) ──
  // Прокрутка тачпадом отключена

  // ── ТАЧСКРИН (1 палец) ──
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let startX = 0, startY = 0, dir = null;

    function onTouchStart(e) {
      if (lockedRef.current) return;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      dir = null; setAnimate(false);
    }
    function onTouchMove(e) {
      if (lockedRef.current) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      if (!dir) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        dir = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
      }
      if (dir === "v") return;
      e.preventDefault();
      const idx = ROUTES.indexOf(pathname);
      let visual = dx;
      if ((dx > 0 && idx === 0) || (dx < 0 && idx === ROUTES.length - 1)) {
        visual = dx * RESIST;
      }
      setOffset(visual);
    }
    function onTouchEnd(e) {
      if (dir !== "h") return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) >= 50) goTo(dx > 0 ? -1 : 1);
      else { setAnimate(true); setOffset(0); }
    }

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove",  onTouchMove,  { passive: false });
    el.addEventListener("touchend",   onTouchEnd,   { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
      el.removeEventListener("touchend",   onTouchEnd);
    };
  }, [pathname, goTo]);

  const idx = ROUTES.indexOf(pathname);

  return (
    <div style={{ overflow: "hidden" }} ref={wrapRef}>
      <div style={{
        transform: `translateX(${offset}px)`,
        transition: animate ? "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
        willChange: "transform",
      }}>
        {children}
      </div>

      {/* Стрелка влево — при свайпе вправо */}
      <div aria-hidden="true" style={{
        position: "fixed", left: "14px", top: "50%",
        transform: "translateY(-50%)",
        zIndex: 900, width: "42px", height: "42px", borderRadius: "50%",
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: "22px", pointerEvents: "none",
        opacity: offset > 12 && idx > 0 ? 1 : 0,
        transition: "opacity 0.12s",
      }}>‹</div>

      {/* Стрелка вправо — при свайпе влево */}
      <div aria-hidden="true" style={{
        position: "fixed", right: "14px", top: "50%",
        transform: "translateY(-50%)",
        zIndex: 900, width: "42px", height: "42px", borderRadius: "50%",
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.2)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: "22px", pointerEvents: "none",
        opacity: offset < -12 && idx < ROUTES.length - 1 ? 1 : 0,
        transition: "opacity 0.12s",
      }}>›</div>
    </div>
  );
}
