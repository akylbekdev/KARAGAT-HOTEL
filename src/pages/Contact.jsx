import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LangContext';

const faqs = [
  {
    q: 'Во сколько заезд и выезд?',
    a: 'Заезд с 14:00, выезд до 12:00. Ранний заезд доступен при наличии свободных номеров.',
  },
  {
    q: 'Можно ли отменить бронь?',
    a: 'Да, бесплатная отмена возможна за 48 часов до даты заезда.',
  },
  {
    q: 'Есть ли трансфер из аэропорта?',
    a: 'Да, трансфер доступен по предварительному запросу при бронировании.',
  },
];

export default function Contact() {
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
          <h1 className="page-title reveal">{tr('Контакты')}</h1>
          <div className="reveal">
            <p className="text-muted"><strong>{tr('Телефон:')}</strong> +996 704 399 939</p>
            <p className="text-muted"><strong>Email:</strong> info@hotelkaragat.com</p>
            <p className="text-muted"><strong>{tr('Адрес:')}</strong> Абдрахманов 89А, Karakol 722200</p>
            <Link to="/map" className="btn btn--secondary">{tr('Открыть раздел «Мы на карте»')}</Link>
            <Link to="/booking" className="btn btn--primary" style={{ marginLeft: '1rem' }}>{tr('Забронировать')}</Link>
          </div>
        </div>
      </section>

      <section className="section section--soft">
        <div className="container faq reveal">
          <h2>{tr('Частые вопросы')}</h2>
          {faqs.map(({ q, a }) => (
            <details key={q}>
              <summary>{tr(q)}</summary>
              <p className="text-muted">{tr(a)}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
