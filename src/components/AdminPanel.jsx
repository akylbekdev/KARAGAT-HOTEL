import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import '../styles/AdminPanel.css';

export default function AdminPanel() {
  const { tr } = useLang();
  const [auth, setAuth] = useState(() => sessionStorage.getItem('admin_auth') === '1');
  const [mode, setMode] = useState('login'); // 'login', 'register', 'verify'
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
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

  function handleLogin(e) {
    e.preventDefault();
    setErr('');
    setSuccess('');
    
    if (!email.includes('@')) {
      setErr(tr('Введите корректный email'));
      return;
    }
    
    if (!code) {
      setErr(tr('Введите код'));
      return;
    }
    
    const adminEmails = JSON.parse(localStorage.getItem('admin_emails') || '[]');
    const admin = adminEmails.find(a => a.email === email && a.code === code);
    
    if (admin) {
      sessionStorage.setItem('admin_auth', '1');
      sessionStorage.setItem('admin_email', email);
      setAuth(true);
      setEmail('');
      setCode('');
    } else {
      setErr(tr('Неверный email или код'));
    }
  }

  function handleRegister(e) {
    e.preventDefault();
    setErr('');
    setSuccess('');
    
    if (!email.includes('@')) {
      setErr(tr('Введите корректный email'));
      return;
    }
    
    if (!code || code.length < 6) {
      setErr(tr('Код должен быть минимум 6 символов'));
      return;
    }
    
    const adminEmails = JSON.parse(localStorage.getItem('admin_emails') || '[]');
    
    if (adminEmails.find(a => a.email === email)) {
      setErr(tr('Этот email уже зарегистрирован'));
      return;
    }
    
    adminEmails.push({ email, code });
    localStorage.setItem('admin_emails', JSON.stringify(adminEmails));
    
    setSuccess(tr('Учётная запись создана! Теперь войдите.'));
    setTimeout(() => {
      setMode('login');
      setEmail('');
      setCode('');
      setSuccess('');
    }, 2000);
  }

  function handleVerify(e) {
    e.preventDefault();
    setErr('');
    setSuccess('');
    
    if (!email.includes('@')) {
      setErr(tr('Введите корректный email'));
      return;
    }
    
    if (!verifyCode) {
      setErr(tr('Введите код для подтверждения'));
      return;
    }
    
    const adminEmails = JSON.parse(localStorage.getItem('admin_emails') || '[]');
    const admin = adminEmails.find(a => a.email === email && a.code === verifyCode);
    
    if (admin) {
      sessionStorage.setItem('admin_auth', '1');
      sessionStorage.setItem('admin_email', email);
      setAuth(true);
      setEmail('');
      setVerifyCode('');
      setSuccess('');
    } else {
      setErr(tr('Неверный код подтверждения'));
    }
  }

  function logout() {
    sessionStorage.removeItem('admin_auth');
    sessionStorage.removeItem('admin_email');
    setAuth(false);
    setMode('login');
  }

  function deleteBooking(id) {
    const next = bookings.filter(b => b.id !== id);
    localStorage.setItem('karagat_bookings', JSON.stringify(next));
    setBookings(next);
  }

  function deleteReview(id) {
    const next = reviews.filter(r => r.id !== id);
    localStorage.setItem('karagat_reviews', JSON.stringify(next));
    setReviews(next);
  }

  if (!auth) {
    return (
      <main className="page-main admin-auth">
        <section className="section admin-auth-section">
          <div className="container">
            <div className="admin-auth-card">
              <div className="admin-auth-header">
                <h1>{tr('Админ-панель')}</h1>
                <p>HOTEL KARAGAT KARAKOL</p>
              </div>

              <div className="admin-auth-tabs">
                <button
                  className={`admin-tab ${mode === 'login' ? 'active' : ''}`}
                  onClick={() => { setMode('login'); setErr(''); setSuccess(''); }}
                >
                  {tr('Войти')}
                </button>
                <button
                  className={`admin-tab ${mode === 'register' ? 'active' : ''}`}
                  onClick={() => { setMode('register'); setErr(''); setSuccess(''); }}
                >
                  {tr('Регистрация')}
                </button>
                <button
                  className={`admin-tab ${mode === 'verify' ? 'active' : ''}`}
                  onClick={() => { setMode('verify'); setErr(''); setSuccess(''); }}
                >
                  {tr('Подтверждение')}
                </button>
              </div>

              {mode === 'login' && (
                <form onSubmit={handleLogin} className="admin-form">
                  <div className="admin-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="admin@hotel.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>{tr('Код доступа')}</label>
                    <input
                      type="password"
                      placeholder={tr('Введите код')}
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  {err && <div className="admin-error">{err}</div>}
                  {success && <div className="admin-success">{success}</div>}

                  <button type="submit" className="admin-btn admin-btn-primary">
                    {tr('Войти')}
                  </button>
                </form>
              )}

              {mode === 'register' && (
                <form onSubmit={handleRegister} className="admin-form">
                  <div className="admin-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="admin@hotel.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>{tr('Код доступа (минимум 6 символов)')}</label>
                    <input
                      type="password"
                      placeholder={tr('Придумайте код')}
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  {err && <div className="admin-error">{err}</div>}
                  {success && <div className="admin-success">{success}</div>}

                  <button type="submit" className="admin-btn admin-btn-success">
                    {tr('Зарегистрироваться')}
                  </button>
                </form>
              )}

              {mode === 'verify' && (
                <form onSubmit={handleVerify} className="admin-form">
                  <div className="admin-form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="admin@hotel.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>{tr('Код подтверждения')}</label>
                    <input
                      type="password"
                      placeholder={tr('Введите код')}
                      value={verifyCode}
                      onChange={e => setVerifyCode(e.target.value)}
                      className="admin-input"
                    />
                  </div>

                  {err && <div className="admin-error">{err}</div>}
                  {success && <div className="admin-success">{success}</div>}

                  <button type="submit" className="admin-btn admin-btn-primary">
                    {tr('Подтвердить')}
                  </button>
                </form>
              )}

              <p className="admin-hint">{tr('Используйте данные для входа в админ-панель')}</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-main admin-dashboard">
      <section className="section admin-section">
        <div className="container">
          <div className="admin-header">
            <h1>{tr('Админ-панель')}</h1>
            <button className="admin-btn admin-btn-logout" onClick={logout}>
              <i className="fa-solid fa-sign-out-alt"></i> {tr('Выйти')}
            </button>
          </div>

          <div className="admin-tabs">
            <button
              className={`admin-tab-btn ${tab === 'bookings' ? 'active' : ''}`}
              onClick={() => setTab('bookings')}
            >
              <i className="fa-solid fa-calendar-check"></i> {tr('Брони')} ({bookings.length})
            </button>
            <button
              className={`admin-tab-btn ${tab === 'reviews' ? 'active' : ''}`}
              onClick={() => setTab('reviews')}
            >
              <i className="fa-solid fa-star"></i> {tr('Отзывы')} ({reviews.length})
            </button>
          </div>

          {/* Брони */}
          {tab === 'bookings' && (
            <div className="admin-content">
              {bookings.length === 0 ? (
                <div className="admin-empty">
                  <i className="fa-solid fa-inbox"></i>
                  <p>{tr('Нет броней')}</p>
                </div>
              ) : (
                <div className="admin-list">
                  {bookings.map(b => (
                    <div key={b.id} className="admin-card">
                      <div className="admin-card-header">
                        <h3>{b.name}</h3>
                        <button
                          onClick={() => deleteBooking(b.id)}
                          className="admin-delete-btn"
                          aria-label={tr('Удалить')}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      <div className="admin-card-info">
                        <p><strong>Email:</strong> {b.email}</p>
                        <p><strong>{tr('Телефон')}:</strong> {b.phone}</p>
                        <p><strong>{tr('Заезд')}:</strong> {b.checkIn} <strong>{tr('Выезд')}:</strong> {b.checkOut}</p>
                        <p><strong>{tr('Гостей')}:</strong> {b.guests} | <strong>{tr('Тип номера')}:</strong> {b.roomType}</p>
                        {b.comment && <p><strong>{tr('Комментарий')}:</strong> "{b.comment}"</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Отзывы */}
          {tab === 'reviews' && (
            <div className="admin-content">
              {reviews.length === 0 ? (
                <div className="admin-empty">
                  <i className="fa-solid fa-comments"></i>
                  <p>{tr('Нет отзывов')}</p>
                </div>
              ) : (
                <div className="admin-list">
                  {reviews.map(r => (
                    <div key={r.id} className="admin-card">
                      <div className="admin-card-header">
                        <h3>
                          {r.name}
                          <span className="admin-rating">
                            {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                          </span>
                        </h3>
                        <button
                          onClick={() => deleteReview(r.id)}
                          className="admin-delete-btn"
                          aria-label={tr('Удалить')}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                      <div className="admin-card-info">
                        <p className="admin-date">{r.date}</p>
                        <p className="admin-review-text">"{r.text}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

