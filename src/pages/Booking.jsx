import { useEffect, useState } from 'react';
import { useLang } from '../context/LangContext';

const BOOKINGS_KEY = 'karagat_bookings';

function getAvailability() {
  const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
  const items = [];
  for (let i = 0; i < 14; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'short' });
    const busy = bookings.some(b => dateStr >= b.checkin && dateStr < b.checkout);
    items.push({ dateStr, label, busy });
  }
  return items;
}

export default function Booking() {
  const { tr } = useLang();
  const [form, setForm] = useState({ name: '', phone: '', checkin: '', checkout: '', guests: '' });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [availability, setAvailability] = useState(getAvailability);

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

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, phone, checkin, checkout, guests } = form;
    if (!name || !phone || !checkin || !checkout || !guests) {
      setMessage(tr('Пожалуйста, заполните все поля.'));
      setMessageType('error');
      return;
    }
    if (checkout <= checkin) {
      setMessage(tr('Дата выезда должна быть позже даты заезда.'));
      setMessageType('error');
      return;
    }
    const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || '[]');
    const conflict = bookings.some(b => checkin < b.checkout && checkout > b.checkin);
    if (conflict) {
      setMessage(tr('На эти даты номер уже занят. Выберите другой период.'));
      setMessageType('error');
      return;
    }
    bookings.push({ checkin, checkout, name });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    setAvailability(getAvailability());
    setForm({ name: '', phone: '', checkin: '', checkout: '', guests: '' });
    setMessage(tr('Бронь отправлена! Мы свяжемся с вами для подтверждения.'));
    setMessageType('success');
    setTimeout(() => setMessage(''), 6000);
  }

  return (
    <main className="page-main">
      <section className="section">
        <div className="container">
          <h1 className="page-title reveal">{tr('Бронирование')}</h1>
          <div className="contact-grid">
            <div className="reveal">
              <p className="text-muted">{tr('Заполните форму, и мы свяжемся с вами для подтверждения брони в ближайшее время.')}</p>
              <div className="availability availability--panel">
                <h3>{tr('Доступность на 14 дней')}</h3>
                <ul>
                  {availability.map(({ dateStr, label, busy }) => (
                    <li key={dateStr} className={busy ? 'busy' : 'free'}>
                      {label} — {busy ? tr('занято') : tr('доступно')}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <form className="booking-form reveal" onSubmit={handleSubmit} noValidate>
              <h2 className="booking-form__title">{tr('Забронировать номер')}</h2>
              <p className="booking-form__subtitle">{tr('Заполните форму, и мы свяжемся с вами для подтверждения.')}</p>

              <div className="booking-form__field">
                <label>{tr('Имя')}</label>
                <input type="text" name="name" placeholder={tr('Например: Айгерим')} required value={form.name} onChange={handleChange} />
              </div>
              <div className="booking-form__field">
                <label>{tr('Телефон')}</label>
                <input type="tel" name="phone" placeholder="+996 700 123 456" required value={form.phone} onChange={handleChange} />
              </div>
              <div className="booking-form__row">
                <div className="booking-form__field">
                  <label>{tr('Дата заезда')}</label>
                  <input type="date" name="checkin" required value={form.checkin} onChange={handleChange} />
                </div>
                <div className="booking-form__field">
                  <label>{tr('Дата выезда')}</label>
                  <input type="date" name="checkout" required value={form.checkout} onChange={handleChange} />
                </div>
              </div>
              <div className="booking-form__field">
                <label>{tr('Кол-во гостей')}</label>
                <input type="number" name="guests" min="1" max="8" required value={form.guests} onChange={handleChange} />
              </div>

              <button type="submit" className="btn btn--primary btn--full">{tr('Отправить бронь')}</button>
              {message && <p className={`form-message ${messageType}`} aria-live="polite">{message}</p>}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
