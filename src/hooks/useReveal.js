import { useEffect, useRef } from 'react';

export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    const elements = el.querySelectorAll ? el.querySelectorAll('.reveal') : [];
    elements.forEach(el => observer.observe(el));
    // also observe root if it has the class
    if (el.classList && el.classList.contains('reveal')) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
