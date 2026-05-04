export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>© {year} HOTEL KARAGAT KARAKOL</p>
      </div>
    </footer>
  );
}
