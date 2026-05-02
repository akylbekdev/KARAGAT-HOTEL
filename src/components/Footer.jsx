export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {year} HOTEL KARAGAT KARAKOL</p>
        <div className="socials">
          <a href="https://wa.me/996704399939" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <i className="fa-brands fa-whatsapp" />
          </a>
          <a href="https://www.instagram.com/hotelkaragat/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fa-brands fa-instagram" />
          </a>
        </div>
      </div>
    </footer>
  );
}
