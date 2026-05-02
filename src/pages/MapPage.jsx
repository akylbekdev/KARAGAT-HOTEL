import { useEffect } from 'react';
import { useLang } from '../context/LangContext';

export default function MapPage() {
  const { tr } = useLang();

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="page-main">
      <section className="section">
        <div className="container reveal">
          <h1 className="page-title">{tr('Мы на карте')}</h1>
          <p className="text-muted">
            Найдите HOTEL KARAGAT KARAKOL на карте и постройте маршрут за пару кликов.
          </p>
          <iframe
            className="map map--full"
            title="Карта отеля"
            src="https://www.google.com/maps?q=%D0%90%D0%B1%D0%B4%D1%80%D0%B0%D1%85%D0%BC%D0%B0%D0%BD%D0%BE%D0%B2%2089%D0%90%2C%20Karakol%20722200&output=embed"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}
