export default function WaFloat() {
  return (
    <div className="float-group">
      <a
        className="float-btn float-btn--ig"
        href="https://www.instagram.com/karagat_hotel/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <i className="fa-brands fa-instagram" />
      </a>
      <a
        className="float-btn float-btn--wa"
        href="https://wa.me/996704399939"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <i className="fa-brands fa-whatsapp" />
        <span className="float-btn__tooltip">Напишите нам</span>
      </a>
    </div>
  );
}
