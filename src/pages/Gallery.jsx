import { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext';

const allPhotos = [
  { src: '/assets/photos/karagat-1.jpg', cat: 'exterior', alt: 'Отель Karagat вечером' },
  { src: '/assets/photos/karagat-2.jpg', cat: 'interior', alt: 'Отель Karagat' },
  { src: '/assets/photos/karagat-3.jpg', cat: 'exterior', alt: 'Отель Karagat' },
  { src: '/assets/photos/karagat-4.jpg', cat: 'exterior', alt: 'Отель Karagat у воды' },
  { src: '/assets/photos/karagat-5.jpg', cat: 'interior', alt: 'Отель Karagat' },
  { src: '/assets/photos/karagat-6.jpg', cat: 'interior', alt: 'Отель Karagat' },
  { src: '/assets/photos/karagat-7.jpg', cat: 'interior', alt: 'Отель Karagat' },
  { src: '/assets/photos/karagat-8.jpg', cat: 'interior', alt: 'Отель Karagat' },
  { src: '/assets/photos/karagat-b1.jpg', cat: 'interior', alt: 'Номер Karagat' },
  { src: '/assets/photos/karagat-b2.jpg', cat: 'interior', alt: 'Номер Karagat' },
  { src: '/assets/photos/karagat-b3.jpg', cat: 'interior', alt: 'Номер Karagat' },
  { src: '/assets/photos/karagat-b4.jpg', cat: 'interior', alt: 'Номер Karagat' },
  { src: '/assets/photos/karagat-b5.jpg', cat: 'interior', alt: 'Номер Karagat' },
  { src: '/assets/photos/karagat-b6.jpg', cat: 'interior', alt: 'Номер Karagat' },
];

const PAGE_SIZE = 8;

export default function Gallery() {
  const { tr } = useLang();
  const [filter, setFilter] = useState('all');
  const [shown, setShown] = useState(PAGE_SIZE);
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
                  onClick={() => { setFilter(key); setShown(PAGE_SIZE); }}
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

          {shown < filtered.length && (
            <div className="gallery-more-wrap reveal">
              <button
                type="button"
                className="btn btn--secondary"
                onClick={() => setShown(s => s + PAGE_SIZE)}
              >
                {tr('Показать еще')}
              </button>
            </div>
          )}
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
