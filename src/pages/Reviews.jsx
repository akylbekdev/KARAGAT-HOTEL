import { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext';

const REVIEWS_KEY = 'karagat_reviews';

function StarRatingInput({ value, onChange }) {
  return (
    <div className="star-rating">
      {[5, 4, 3, 2, 1].map(n => (
        <span key={n}>
          <input
            type="radio"
            name="rating"
            id={`s${n}`}
            value={n}
            checked={value === n}
            onChange={() => onChange(n)}
          />
          <label htmlFor={`s${n}`} title={['', 'Очень плохо', 'Плохо', 'Нормально', 'Хорошо', 'Отлично'][n]}>★</label>
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const { tr } = useLang();
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [reviews, setReviews] = useState(() => {
    try { return JSON.parse(localStorage.getItem(REVIEWS_KEY)) || []; }
    catch { return []; }
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [reviews]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !text.trim()) {
      setMessage(tr('Пожалуйста, заполните имя и текст отзыва.'));
      setMessageType('error');
      return;
    }
    const newReview = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      rating,
      date: new Date().toLocaleDateString('ru-RU'),
    };
    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(updated));
    setName(''); setText(''); setRating(0);
    setMessage(tr('Спасибо! Ваш отзыв добавлен.'));
    setMessageType('success');
    setTimeout(() => setMessage(''), 4000);
  }

  return (
    <main className="page-main">
      <section className="section">
        <div className="container reveal">
          <h1 className="page-title">{tr('Отзывы гостей')}</h1>
          <p className="text-muted">{tr('Мнение наших гостей о проживании в HOTEL KARAGAT KARAKOL.')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="reviews-layout reveal">
            <form className="review-form" onSubmit={handleSubmit} noValidate>
              <h3>{tr('Оставить отзыв')}</h3>
              <label>
                {tr('Ваше имя')}
                <input
                  type="text"
                  placeholder={tr('Например: Айгерим')}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                {tr('Ваш отзыв')}
                <textarea
                  rows={4}
                  maxLength={400}
                  placeholder={tr('Поделитесь впечатлением о проживании')}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  required
                />
              </label>
              <div className="form-field">
                <span className="field-label">{tr('Ваша оценка')}</span>
                <StarRatingInput value={rating} onChange={setRating} />
              </div>
              <button type="submit" className="btn btn--primary btn--full">{tr('Отправить отзыв')}</button>
              {message && <p className={`form-message ${messageType}`}>{message}</p>}
            </form>

            <div className="reviews-feed">
              <h3>{tr('Новые отзывы')}</h3>
              {reviews.length === 0 ? (
                <p className="text-muted">{tr('Пока отзывов нет. Будьте первым гостем, кто оставит отзыв.')}</p>
              ) : (
                reviews.map(r => (
                  <div key={r.id} style={{ marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '14px' }}>
                    <div className="review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</div>
                    <p style={{ margin: '4px 0' }}>{r.text}</p>
                    <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{r.name} · {r.date}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
