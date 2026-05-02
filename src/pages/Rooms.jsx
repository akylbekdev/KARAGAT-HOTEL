import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const rooms = [
  {
    img: '/assets/photos/karagat-b1.jpg',
    alt: 'Стандартный номер',
    stars: '★★★☆☆',
    rating: '3.0',
    title: 'Стандарт',
    desc: 'Уютный номер для 1-2 гостей с рабочей зоной и удобной кроватью.',
    price: 'от 4 500 KGS / ночь',
  },
  {
    img: '/assets/photos/karagat-b3.jpg',
    alt: 'Семейный номер',
    stars: '★★★★☆',
    rating: '4.0',
    title: 'Семейный',
    desc: 'Просторный номер для 3-4 гостей, идеально для семейного отдыха.',
    price: 'от 6 900 KGS / ночь',
  },
  {
    img: '/assets/photos/karagat-b5.jpg',
    alt: 'Улучшенный номер',
    stars: '★★★★★',
    rating: '5.0',
    title: 'Улучшенный',
    desc: 'Премиальный номер с панорамным видом и расширенным сервисом.',
    price: 'от 8 900 KGS / ночь',
  },
];

const compareRows = [
  ['Гостей', '1–2', '3–4', '1–3'],
  ['Площадь', '22 м²', '36 м²', '45 м²'],
  ['Wi-Fi', '✔', '✔', '✔'],
  ['Завтрак включён', '✔', '✔', '✔'],
  ['Мини-холодильник', '✔', '✔', '✔'],
  ['Детская кроватка', '—', '✔', '—'],
  ['Панорамный вид', '—', '—', '✔'],
  ['Халат и тапочки', '—', '—', '✔'],
  ['Ванна / душ', 'Душ', 'Ванна + душ', 'Джакузи'],
];

const pricingCards = [
  {
    title: 'Стандарт',
    price: '4 500',
    featured: false,
    features: [
      { ok: true, text: '1–2 гостя' },
      { ok: true, text: '22 м², двуспальная кровать' },
      { ok: true, text: 'Завтрак включён' },
      { ok: true, text: 'Wi-Fi, холодильник' },
      { ok: true, text: 'Душевая кабина' },
      { ok: false, text: 'Панорамный вид' },
      { ok: false, text: 'Халат и тапочки' },
    ],
  },
  {
    title: 'Семейный',
    price: '6 900',
    featured: true,
    badge: 'Популярный',
    features: [
      { ok: true, text: '3–4 гостя' },
      { ok: true, text: '36 м², раздельные зоны' },
      { ok: true, text: 'Завтрак включён' },
      { ok: true, text: 'Wi-Fi, холодильник' },
      { ok: true, text: 'Ванна + душ' },
      { ok: true, text: 'Детская кроватка' },
      { ok: false, text: 'Панорамный вид' },
    ],
  },
  {
    title: 'Улучшенный',
    price: '8 900',
    featured: false,
    features: [
      { ok: true, text: '1–3 гостя' },
      { ok: true, text: '45 м², панорамный вид' },
      { ok: true, text: 'Завтрак включён' },
      { ok: true, text: 'Wi-Fi, холодильник' },
      { ok: true, text: 'Джакузи' },
      { ok: true, text: 'Халат и тапочки' },
      { ok: true, text: 'Поздний выезд до 14:00' },
    ],
  },
];

export default function Rooms() {
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
        <div className="container">
          <h1 className="page-title reveal">{tr('Номера')}</h1>
          <p className="text-muted reveal">{tr('Выберите подходящий формат проживания и отправьте бронь в один клик.')}</p>
          <div className="room-grid room-grid--full">
            {rooms.map(({ img, alt, stars, rating, title, desc, price }) => (
              <article className="room-card reveal" key={title}>
                <img src={img} alt={alt} loading="lazy" />
                <div className="room-card__body">
                  <div className="room-stars">{stars} <span>{rating}</span></div>
                  <h3>{tr(title)}</h3>
                  <p className="text-muted">{tr(desc)}</p>
                  <div className="room-card__footer">
                    <strong>{tr(price)}</strong>
                    <Link className="btn btn--secondary" to="/contact">{tr('Забронировать')}</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <h2 className="reveal">{tr('Сравнение номеров')}</h2>
          <p className="text-muted reveal">{tr('Что включено в каждый тип номера — чтобы выбрать было проще.')}</p>
          <div className="compare-wrap reveal">
            <table className="compare-table">
              <thead>
                <tr>
                  <th>{tr('Особенность')}</th>
                  <th>{tr('Стандарт')}</th>
                  <th>{tr('Семейный')}</th>
                  <th>{tr('Улучшенный')}</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map(([feat, ...vals]) => (
                  <tr key={feat}>
                    <td>{tr(feat)}</td>
                    {vals.map((v, i) => <td key={i}>{tr(v)}</td>)}
                  </tr>
                ))}
                <tr className="compare-price">
                  <td>{tr('Цена от')}</td>
                  <td>4 500 KGS</td>
                  <td>6 900 KGS</td>
                  <td>8 900 KGS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="reveal">{tr('Тарифы и пакеты')}</h2>
          <p className="text-muted reveal">{tr('Выберите подходящий пакет — все включают завтрак и Wi-Fi.')}</p>
          <div className="pricing-grid reveal">
            {pricingCards.map(({ title, price, featured, badge, features }) => (
              <article
                className={`pricing-card${featured ? ' pricing-card--featured' : ''}`}
                key={title}
              >
                {badge && <div className="pricing-card__badge">{tr(badge)}</div>}
                <div className="pricing-card__header">
                  <h3>{tr(title)}</h3>
                  <div className="pricing-card__price">{price} <span>KGS / ночь</span></div>
                </div>
                <ul className="pricing-card__list">
                  {features.map(({ ok, text }) => (
                    <li key={text} className={ok ? '' : 'pricing-card__list--off'}>
                      <i className={`fa-solid ${ok ? 'fa-check' : 'fa-xmark'}`} /> {tr(text)}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`btn ${featured ? 'btn--primary' : 'btn--secondary'} btn--full`}
                >
                  {tr('Забронировать')}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
