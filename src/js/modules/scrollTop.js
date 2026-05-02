export function initScrollTop(toTop) {
  if (!toTop) return;

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
