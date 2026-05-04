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
    guests: '1-2 гостя',
    size: '22 м²',
    bestFor: 'Короткая поездка',
    price: 'от 4 500 KGS / ночь',
  },
  {
    img: '/assets/photos/karagat-b3.jpg',
    alt: 'Семейный номер',
    stars: '★★★★☆',
    rating: '4.0',
    title: 'Семейный',
    desc: 'Просторный номер для 3-4 гостей, идеально для семейного отдыха.',
    guests: '3-4 гостя',
    size: '36 м²',
    bestFor: 'Семья с детьми',
    price: 'от 6 900 KGS / ночь',
  },
  {
    img: '/assets/photos/karagat-b5.jpg',
    alt: 'Улучшенный номер',
    stars: '★★★★★',
    rating: '5.0',
    title: 'Улучшенный',
    desc: 'Премиальный номер с панорамным видом и расширенным сервисом.',
    guests: '1-3 гостя',
    size: '45 м²',
    bestFor: 'Особый отдых',
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
          <p className="text-muted reveal">{tr('Мы упростили выбор: сначала смотрите 3 типа номеров, затем быстро сравниваете их по ключевым параметрам.')}</p>

          <div className="rooms-intro reveal">
            <div className="rooms-intro__item"><strong>1.</strong> {tr('Выберите формат: Стандарт, Семейный или Улучшенный')}</div>
            <div className="rooms-intro__item"><strong>2.</strong> {tr('Сверьте гостей, площадь и удобства')}</div>
            <div className="rooms-intro__item"><strong>3.</strong> {tr('Нажмите «Забронировать» и оставьте заявку')}</div>
          </div>

          <div className="room-grid room-grid--full">
            {rooms.map(({ img, alt, stars, rating, title, desc, guests, size, bestFor, price }) => (
              <article className="room-card reveal" key={title}>
                <img src={img} alt={alt} loading="lazy" />
                <div className="room-card__body">
                  <div className="room-stars">{stars} <span>{rating}</span></div>
                  <h3>{tr(title)}</h3>
                  <p className="text-muted">{tr(desc)}</p>
                  <div className="room-meta">
                    <span className="room-meta__item"><i className="fa-solid fa-users" /> {tr(guests)}</span>
                    <span className="room-meta__item"><i className="fa-solid fa-ruler-combined" /> {size}</span>
                    <span className="room-meta__item"><i className="fa-solid fa-star" /> {tr(bestFor)}</span>
                  </div>
                  <div className="room-card__footer">
                    <strong>{tr(price)}</strong>
                    <Link className="btn btn--primary" to="/booking">{tr('Забронировать')}</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container">
          <h2 className="reveal">{tr('Быстрое сравнение')}</h2>
          <p className="text-muted reveal">{tr('Коротко и по делу: чем отличаются номера, чтобы выбрать за 1 минуту.')}</p>

          <div className="rooms-help reveal">
            <article className="rooms-help__card">
              <h3>{tr('Если вы вдвоем')}</h3>
              <p>{tr('Берите Стандарт: всё необходимое, оптимальная цена.')}</p>
            </article>
            <article className="rooms-help__card">
              <h3>{tr('Если вы семьей')}</h3>
              <p>{tr('Семейный номер с дополнительным пространством и ванной.')}</p>
            </article>
            <article className="rooms-help__card">
              <h3>{tr('Если хотите максимум')}</h3>
              <p>{tr('Улучшенный: панорамный вид, джакузи и премиум-комфорт.')}</p>
            </article>
          </div>

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

          <div className="rooms-cta reveal">
            <p className="text-muted">{tr('Не уверены, какой номер выбрать? Мы подскажем лучший вариант под ваш запрос.')}</p>
            <Link to="/contact" className="btn btn--secondary">{tr('Получить консультацию')}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
