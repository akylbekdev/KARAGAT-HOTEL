import { useEffect, useRef } from 'react';

export default function useCounter(target, decimal = false) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        const dur = 1600;
        const start = performance.now();
        function step(now) {
          const progress = Math.min((now - start) / dur, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const val = eased * target;
          el.textContent = decimal
            ? (val / 10).toFixed(1)
            : Math.floor(val).toString();
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimal]);

  return ref;
}
