import { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext';

const allPhotos = [
  { src: '/assets/photos/1.jpg', cat: 'exterior', alt: 'Отель Karagat ночью' },
  { src: '/assets/photos/2.jpg', cat: 'exterior', alt: 'Отель Karagat днём' },
  { src: '/assets/photos/3.jpg', cat: 'exterior', alt: 'Отель Karagat на рассвете' },
  { src: '/assets/photos/4.jpg', cat: 'exterior', alt: 'Отель Karagat вечером' },
  { src: '/assets/photos/5.jpg', cat: 'exterior', alt: 'Отель Karagat фасад' },
  { src: '/assets/photos/6.jpg', cat: 'exterior', alt: 'Территория отеля Karagat' },
  { src: '/assets/photos/7.jpg', cat: 'exterior', alt: 'Площадь у отеля Karagat' },
  { src: '/assets/photos/8.jpg', cat: 'exterior', alt: 'Отель Karagat ночная подсветка' },
  { src: '/assets/photos/9.jpg', cat: 'exterior', alt: 'Отель Karagat вход' },
];

const INITIAL = 3;
const PAGE_SIZE = 6;

export default function Gallery() {
  const { tr } = useLang();
  const [filter, setFilter] = useState('all');
  const [shown, setShown] = useState(INITIAL);
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'all' ? allPhotos : allPhotos.filter(p => p.cat === filter);
  const visible = filtered.slice(0, shown);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [filter, shown]);

  // Close lightbox on Escape
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') setLightbox(null); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main className="page-main">
      <section className="section">
        <div className="container">
          <h1 className="page-title reveal">{tr('Галерея')}</h1>
          <div className="gallery-toolbar reveal">
            <div className="gallery-filter">
              {[
                { key: 'all', label: 'Все' },
                { key: 'exterior', label: 'Экстерьер' },
                { key: 'interior', label: 'Интерьер' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  className={filter === key ? 'active' : ''}
                  onClick={() => { setFilter(key); setShown(INITIAL); }}
                >
                  {tr(label)}
                </button>
              ))}
            </div>
          </div>

          <div className="gallery-grid">
            {visible.map((photo, i) => (
              <button
                key={photo.src}
                className="gallery-item reveal"
                aria-label={`Открыть фото ${i + 1}`}
                onClick={() => setLightbox(photo.src)}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </button>
            ))}
          </div>

          <div className="gallery-more-wrap reveal">
            {shown < filtered.length && (
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setShown(filtered.length)}
              >
                {tr('Показать ещё')}
              </button>
            )}
            {shown >= filtered.length && filtered.length > INITIAL && (
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => { setShown(INITIAL); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                {tr('Показать меньше')}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <div
        className={`lightbox${lightbox ? ' active' : ''}`}
        aria-hidden={!lightbox}
        onClick={() => setLightbox(null)}
      >
        <button
          className="lightbox__close"
          aria-label="Закрыть"
          onClick={() => setLightbox(null)}
        >
          <i className="fa-solid fa-xmark" />
        </button>
        {lightbox && <img src={lightbox} alt="Просмотр фото" onClick={e => e.stopPropagation()} />}
      </div>
    </main>
  );
}
