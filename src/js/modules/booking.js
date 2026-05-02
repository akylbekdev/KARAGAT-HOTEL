import { getJson, setJson } from '../utils/storage.js';

const BOOKINGS_KEY = 'karagatBookings';

function showMessage(target, text, isError) {
  target.textContent = text;
  target.className = `form-message ${isError ? 'error' : 'success'}`;
}

function validateBooking(data) {
  if (!data.name || !data.phone || !data.checkin || !data.checkout || !data.guests) {
    return 'Пожалуйста, заполните все поля.';
  }

  if (new Date(data.checkout) <= new Date(data.checkin)) {
    return 'Дата выезда должна быть позже даты заезда.';
  }

  return '';
}

export function initBooking({ bookingForm, formMessage }) {
  if (!bookingForm || !formMessage) return;

  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData.entries());

    const validationError = validateBooking(data);
    if (validationError) {
      showMessage(formMessage, validationError, true);
      return;
    }

    const bookings = getJson(BOOKINGS_KEY, []);
    bookings.push({ ...data, createdAt: new Date().toISOString() });
    setJson(BOOKINGS_KEY, bookings);

    bookingForm.reset();
    showMessage(formMessage, 'Бронь отправлена', false);
  });
}
