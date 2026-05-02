import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';
import useCounter from '../hooks/useCounter';

function RevealSection({ children, className = '' }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
  return <div className={className}>{children}</div>;
}

function StatItem({ target, unit, label, decimal }) {
  const numRef = useCounter(target, decimal);
  return (
    <div className="stat-item reveal">
      <div className="stat-row">
        <strong className="stat-number" ref={numRef}>0</strong>
        <span className="stat-unit">{unit}</span>
      </div>
      <p>{label}</p>
    </div>
  );
}

export default function Home() {
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
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" />
        <img className="hero__branches" src="/assets/branches.svg" alt="" aria-hidden="true" />
        <div className="container hero__content reveal">
          <p className="hero__tag">Kyrgyzstan, Karakol</p>
          <h1>HOTEL KARAGAT</h1>
          <p>{tr('Тишина гор, премиальный сервис и атмосфера утонченного отдыха в центре Каракола.')}</p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/booking">{tr('Забронировать')}</Link>
            <Link className="btn btn--ghost" to="/rooms">{tr('Посмотреть номера')}</Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="section">
        <div className="container split-grid">
          <div className="reveal">
            <h2>{tr('О нас')}</h2>
            <p className="text-muted">
              {tr('HOTEL KARAGAT KARAKOL создан для гостей, которым важны комфорт, эстетика и безупречный сервис. Минималистичный интерьер, спокойная атмосфера и внимание к каждой детали делают отдых особенным. Мы расположены в самом сердце Каракола — в нескольких минутах от горных троп, национального парка и живописного озера Иссык-Куль. Каждый номер оформлен с заботой о госте: натуральные материалы, мягкое освещение и продуманное зонирование создают атмосферу уюта и покоя. Наша команда работает круглосуточно, чтобы ваш отдых прошёл без забот.')}
            </p>
          </div>
          <div className="reveal card-media">
            <img src="/assets/photos/karagat-2.jpg" alt="Лобби отеля" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section section--soft">
        <div className="container">
          <h2 className="reveal">{tr('Удобства')}</h2>
          <div className="amenities">
            {[
              { icon: 'fa-wifi', label: 'Высокоскоростной Wi-Fi' },
              { icon: 'fa-square-parking', label: 'Бесплатная парковка' },
              { icon: 'fa-bell-concierge', label: 'Ресепшн 24/7' },
              { icon: 'fa-mug-hot', label: 'Завтрак и кофе-зона' },
            ].map(({ icon, label }) => (
              <article className="amenity reveal" key={label}>
                <i className={`fa-solid ${icon}`} />
                <span>{tr(label)}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <StatItem target={5} unit="+" label={tr('лет опыта')} />
            <StatItem target={2400} unit="+" label={tr('довольных гостей')} />
            <StatItem target={48} unit=" / 5.0" label={tr('средний рейтинг')} decimal />
            <StatItem target={24} unit="/ 7" label={tr('часа к вашим услугам')} />
          </div>
        </div>
      </section>

      {/* Special offers */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <h2>{tr('Спецпредложения')}</h2>
            <Link className="btn btn--secondary" to="/contact">{tr('Выбрать пакет')}</Link>
          </div>
          <div className="offer-grid">
            {[
              { title: 'Weekend Escape', desc: '2 ночи + завтрак + поздний выезд до 16:00.', promo: '-15% до конца месяца' },
              { title: 'Family Stay', desc: 'Семейный номер, детская кроватка и трансфер.', promo: '-12% при брони от 3 ночей' },
              { title: 'Romantic Night', desc: 'Декор номера, фруктовая тарелка и завтрак в номер.', promo: 'Подарочный комплимент от отеля' },
            ].map(({ title, desc, promo }) => (
              <article className="offer-card reveal" key={title}>
                <h3>{title}</h3>
                <p className="text-muted">{tr(desc)}</p>
                <strong>{tr(promo)}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms preview */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <h2>{tr('Превью номеров')}</h2>
            <Link className="btn btn--secondary" to="/rooms">{tr('Подробнее')}</Link>
          </div>
          <div className="room-grid">
            {[
              { img: '/assets/room-standard.svg', alt: 'Стандарт', title: 'Стандарт', desc: 'Светлый номер с рабочей зоной и комфортной кроватью.' },
              { img: '/assets/room-family.svg', alt: 'Семейный', title: 'Семейный', desc: 'Простор для всей семьи с отдельной зоной отдыха.' },
              { img: '/assets/room-deluxe.svg', alt: 'Улучшенный', title: 'Улучшенный', desc: 'Премиальный интерьер и расширенный набор услуг.' },
            ].map(({ img, alt, title, desc }) => (
              <article className="room-card reveal" key={title}>
                <img src={img} alt={alt} loading="lazy" />
                <div className="room-card__body">
                  <h3>{tr(title)}</h3>
                  <p className="text-muted">{tr(desc)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
