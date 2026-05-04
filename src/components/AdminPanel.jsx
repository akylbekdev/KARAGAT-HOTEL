import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import '../styles/AdminPanel.css';

export default function AdminPanel() {
  const { tr } = useLang();
  const [auth, setAuth] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [showCode, setShowCode] = useState(false);
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [tab, setTab] = useState('bookings');

  useEffect(() => {
    if (!auth) return;
    setBookings(JSON.parse(localStorage.getItem('karagat_bookings') || '[]'));
    setReviews(JSON.parse(localStorage.getItem('karagat_reviews') || '[]'));
  }, [auth]);

  function switchMode(m) {
    setMode(m);
    setErr('');
    setSuccess('');
    setEmail('');
    setCode('');
    setShowCode(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErr('');
    setSuccess('');

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedCode = code.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(normalizedEmail);

    if (!validEmail) {
      setErr(tr('Введите корректный email'));
      return;
    }
    if (!trimmedCode || trimmedCode.length < 8) {
      setErr(tr('Код должен быть минимум 8 символов'));
      return;
    }

    const strongCode = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&._-]{8,}$/.test(trimmedCode);
    if (mode === 'register' && !strongCode) {
      setErr(tr('Код должен содержать минимум 8 символов, буквы и цифры'));
      return;
    }

    const adminEmails = JSON.parse(localStorage.getItem('admin_emails') || '[]');

    if (mode === 'register') {
      if (adminEmails.find(a => (a.email || '').toLowerCase() === normalizedEmail)) {
        setErr(tr('Этот email уже зарегистрирован'));
        return;
      }
      adminEmails.push({ email: normalizedEmail, code: trimmedCode });
      localStorage.setItem('admin_emails', JSON.stringify(adminEmails));
      setSuccess(tr('Аккаунт создан! Входим...'));
      setTimeout(() => {
        sessionStorage.setItem('admin_auth', '1');
        sessionStorage.setItem('admin_email', normalizedEmail);
        setAuth(true);
      }, 1000);
    } else {
      const admin = adminEmails.find(a => (a.email || '').toLowerCase() === normalizedEmail && a.code === trimmedCode);
      if (admin) {
        sessionStorage.setItem('admin_auth', '1');
        sessionStorage.setItem('admin_email', normalizedEmail);
        setAuth(true);
      } else {
        setErr(tr('Неверный email или код'));
      }
    }
  }

  function logout() {
    sessionStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_email');
    setAuth(false);
    setEmail('');
    setCode('');
    setShowCode(false);
    setMode('login');
  }

  function deleteBooking(id) {
    if (!window.confirm(tr('Удалить эту бронь?'))) return;
    const next = bookings.filter(b => b.id !== id);
    localStorage.setItem('karagat_bookings', JSON.stringify(next));
    setBookings(next);
  }

  function deleteReview(id) {
    if (!window.confirm(tr('Удалить этот отзыв?'))) return;
    const next = reviews.filter(r => r.id !== id);
    localStorage.setItem('karagat_reviews', JSON.stringify(next));
    setReviews(next);
  }

  /* ── Auth screen ── */
  if (!auth) {
    return (
      <main className="page-main ap-screen">
        <div className="ap-card">
          {/* Logo / title */}
          <div className="ap-logo">
            <span className="ap-logo__hotel">HOTEL</span>
            <span className="ap-logo__name">KARAGAT</span>
            <span className="ap-logo__sub">Karakol, Kyrgyzstan</span>
          </div>

          {/* Mode switcher */}
          <div className="ap-switcher">
            <button
              className={`ap-switcher__btn${mode === 'login' ? ' ap-switcher__btn--active' : ''}`}
              onClick={() => switchMode('login')}
            >
              {tr('Войти')}
            </button>
            <button
              className={`ap-switcher__btn${mode === 'register' ? ' ap-switcher__btn--active' : ''}`}
              onClick={() => switchMode('register')}
            >
              {tr('Регистрация')}
            </button>
            <span
              className="ap-switcher__slider"
              style={{ transform: mode === 'register' ? 'translateX(100%)' : 'translateX(0)' }}
            />
          </div>


          {/* Single form */}
          <form className="ap-form" onSubmit={handleSubmit}>
            <div className="ap-field">
              <label className="ap-field__label">Email</label>
              <div className="ap-field__wrap">
                <i className="fa-regular fa-envelope ap-field__icon" />
                <input
                  type="email"
                  className="ap-field__input"
                  placeholder="admin@karagat.kg"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="ap-field">
              <label className="ap-field__label">
                {mode === 'register' ? tr('Придумайте код (мин. 8 символов)') : tr('Код доступа')}
              </label>
              <div className="ap-field__wrap">
                <i className="fa-solid fa-lock ap-field__icon" />
                <input
                  type={showCode ? 'text' : 'password'}
                  className="ap-field__input"
                  placeholder="••••••"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  className="ap-field__toggle"
                  aria-label={showCode ? tr('Скрыть код') : tr('Показать код')}
                  onClick={() => setShowCode(v => !v)}
                >
                  <i className={`fa-solid ${showCode ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>

            {err && (
              <div className="ap-msg ap-msg--err">
                <i className="fa-solid fa-circle-exclamation" /> {err}
              </div>
            )}
            {success && (
              <div className="ap-msg ap-msg--ok">
                <i className="fa-solid fa-circle-check" /> {success}
              </div>
            )}

            <button type="submit" className="ap-submit">
              {mode === 'register' ? tr('Создать аккаунт') : tr('Войти в панель')}
              <i className="fa-solid fa-arrow-right" />
            </button>
          </form>
        </div>
      </main>
    );
  }

  /* ── Dashboard ── */
  const adminEmail = sessionStorage.getItem('admin_email') || '';

  return (
    <main className="page-main ap-dash">
      <div className="container">

        {/* Dashboard header */}
        <div className="ap-dash__head">
          <div className="ap-dash__title">
            <span className="ap-dash__label">{tr('Админ-панель')}</span>
            <span className="ap-dash__email">{adminEmail}</span>
          </div>
          <button className="ap-logout" onClick={logout}>
            <i className="fa-solid fa-right-from-bracket" />
            {tr('Выйти')}
          </button>
        </div>

        {/* Tabs */}
        <div className="ap-tabs">
          <button
            className={`ap-tabs__btn${tab === 'bookings' ? ' ap-tabs__btn--active' : ''}`}
            onClick={() => setTab('bookings')}
          >
            <i className="fa-solid fa-calendar-check" />
            {tr('Брони')}
            <span className="ap-tabs__count">{bookings.length}</span>
          </button>
          <button
            className={`ap-tabs__btn${tab === 'reviews' ? ' ap-tabs__btn--active' : ''}`}
            onClick={() => setTab('reviews')}
          >
            <i className="fa-solid fa-star" />
            {tr('Отзывы')}
            <span className="ap-tabs__count">{reviews.length}</span>
          </button>
        </div>

        {/* Bookings */}
        {tab === 'bookings' && (
          <div className="ap-list">
            {bookings.length === 0 ? (
              <div className="ap-empty">
                <i className="fa-solid fa-inbox" />
                <p>{tr('Броней пока нет')}</p>
              </div>
            ) : bookings.map(b => (
              <div key={b.id} className="ap-item">
                <div className="ap-item__head">
                  <div className="ap-item__avatar">{b.name?.[0]?.toUpperCase()}</div>
                  <div>
                    <div className="ap-item__name">{b.name}</div>
                    <div className="ap-item__meta">{b.email} · {b.phone}</div>
                  </div>
                  <button
                    className="ap-item__del"
                    onClick={() => deleteBooking(b.id)}
                    aria-label={tr('Удалить')}
                  >
                    <i className="fa-solid fa-trash-can" />
                  </button>
                </div>
                <div className="ap-item__body">
                  <div className="ap-chip">
                    <i className="fa-regular fa-calendar" />
                    {b.checkIn} → {b.checkOut}
                  </div>
                  <div className="ap-chip">
                    <i className="fa-solid fa-users" />
                    {b.guests} {tr('гостей')}
                  </div>
                  <div className="ap-chip">
                    <i className="fa-solid fa-bed" />
                    {b.roomType}
                  </div>
                  {b.comment && (
                    <div className="ap-item__comment">"{b.comment}"</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Reviews */}
        {tab === 'reviews' && (
          <div className="ap-list">
            {reviews.length === 0 ? (
              <div className="ap-empty">
                <i className="fa-solid fa-comments" />
                <p>{tr('Отзывов пока нет')}</p>
              </div>
            ) : reviews.map(r => (
              <div key={r.id} className="ap-item">
                <div className="ap-item__head">
                  <div className="ap-item__avatar">{r.name?.[0]?.toUpperCase()}</div>
                  <div>
                    <div className="ap-item__name">{r.name}</div>
                    <div className="ap-item__stars">
                      {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                    </div>
                  </div>
                  <button
                    className="ap-item__del"
                    onClick={() => deleteReview(r.id)}
                    aria-label={tr('Удалить')}
                  >
                    <i className="fa-solid fa-trash-can" />
                  </button>
                </div>
                <div className="ap-item__body">
                  <p className="ap-item__review">"{r.text}"</p>
                  <span className="ap-item__date">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

