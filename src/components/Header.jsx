import { useState, useEffect, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLang } from '../context/LangContext';

const DRAWER_ITEMS = [
  { to: '/',        icon: 'fa-solid fa-house',          label: 'Главная'     },
  { to: '/rooms',   icon: 'fa-solid fa-bed',             label: 'Номера'      },
  { to: '/gallery', icon: 'fa-solid fa-images',          label: 'Галерея'     },
  { to: '/contact', icon: 'fa-solid fa-phone',           label: 'Контакты'    },
  { to: '/map',     icon: 'fa-solid fa-map-pin',         label: 'Мы на карте' },
  { to: '/reviews', icon: 'fa-solid fa-star',            label: 'Отзывы'      },
  { to: '/booking', icon: 'fa-solid fa-calendar-check',  label: 'Бронь'       },
];

export default function Header() {
  const { dark, toggle } = useTheme();
  const { lang, changeLang, tr, languages } = useLang();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoOpen, setLogoOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [langQuery, setLangQuery] = useState('');

  useEffect(() => {
    if (!langOpen) return;
    function onKey(e) { if (e.key === 'Escape') setLangOpen(false); }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [langOpen]);

  const links = [
    { to: '/', label: 'Главная' },
    { to: '/rooms', label: 'Номера' },
    { to: '/gallery', label: 'Галерея' },
    { to: '/contact', label: 'Контакты' },
    { to: '/map', label: 'Мы на карте' },
    { to: '/reviews', label: 'Отзывы' },
    { to: '/booking', label: 'Бронь' },
  ];

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  const filteredLangs = useMemo(() => {
    const q = langQuery.trim().toLowerCase();
    if (!q) return languages;
    return languages.filter(l =>
      l.code.toLowerCase().includes(q) ||
      l.name.toLowerCase().includes(q) ||
      l.native.toLowerCase().includes(q)
    );
  }, [languages, langQuery]);

  function selectLang(code) {
    changeLang(code);
    setLangOpen(false);
    setLangQuery('');
  }

  return (
    <>
      <header className="header">
        <div className="container header__inner">

          {/* Бургер — только на мобиле, крайний левый */}
          <button
            className="mob-burger"
            aria-label="Открыть меню"
            onClick={() => setDrawerOpen(true)}
          >
            <i className="fa-solid fa-bars" />
          </button>

          {/* Логотип — по центру на мобиле */}
          <NavLink className="brand" to="/" aria-label="На главную">
            <img
              src="/assets/logo.svg"
              alt="HOTEL KARAGAT"
              className="brand-logo"
              width="48"
              height="48"
              onClick={e => { e.preventDefault(); setLogoOpen(true); }}
            />
            <span aria-label="Hotel Karagat" />
          </NavLink>

          {/* Десктопная навигация */}
          <nav className="nav">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {tr(label)}
              </NavLink>
            ))}
          </nav>

          {/* Кнопка языка */}
          <button
            className="lang-trigger"
            aria-label="Выбрать язык"
            onClick={() => setLangOpen(true)}
          >
            <span className="lang-trigger__flag">{currentLang?.flag}</span>
            <span className="lang-trigger__code">{lang.toUpperCase()}</span>
            <i className="fa-solid fa-chevron-down lang-trigger__chevron" />
          </button>

          {/* Тема — крайняя правая на мобиле */}
          <button className="theme-toggle" aria-label="Переключить тему" onClick={toggle}>
            <i className={dark ? 'fa-regular fa-sun' : 'fa-regular fa-moon'} />
          </button>

        </div>
      </header>

      {/* ── Lang modal ── */}
      <div
        className={`lang-modal-overlay${langOpen ? ' open' : ''}`}
        onClick={() => { setLangOpen(false); setLangQuery(''); }}
      >
        <div
          className="lang-modal"
          onClick={e => e.stopPropagation()}
          role="dialog"
          aria-label="Выбор языка"
        >
          <div className="lang-modal__head">
            <i className="fa-solid fa-globe" />
            <span>Выбор языка</span>
            <button className="lang-modal__close" onClick={() => { setLangOpen(false); setLangQuery(''); }} aria-label="Закрыть">
              <i className="fa-solid fa-xmark" />
            </button>
          </div>

          <div className="lang-modal__search-wrap">
            <i className="fa-solid fa-magnifying-glass" />
            <input
              className="lang-modal__search"
              type="text"
              placeholder="Поиск языка: English, Русский, عربي..."
              value={langQuery}
              onChange={e => setLangQuery(e.target.value)}
            />
          </div>

          <div className="lang-modal__list">
            {filteredLangs.map(l => (
              <button
                key={l.code}
                className={`lang-option${lang === l.code ? ' selected' : ''}`}
                onClick={() => selectLang(l.code)}
              >
                <span className="lang-option__flag">{l.flag}</span>
                <span className="lang-option__info">
                  <span className="lang-option__name">{l.native}</span>
                  <span className="lang-option__native">{l.name}</span>
                  <span className="lang-option__code">{l.code.toUpperCase()}</span>
                </span>
                {lang === l.code && <i className="fa-solid fa-check lang-option__check" />}
              </button>
            ))}
            {filteredLangs.length === 0 && (
              <div className="lang-modal__empty">Язык не найден</div>
            )}
          </div>
        </div>
      </div>

      {/* Logo overlay */}
      <div
        className={`logo-overlay${logoOpen ? ' is-open' : ''}`}
        onClick={() => setLogoOpen(false)}
      >
        <img src="/assets/logo.svg" alt="HOTEL KARAGAT" />
      </div>

      {/* Overlay */}
      <div
        className={`mob-drawer-overlay${drawerOpen ? ' visible' : ''}`}
        onClick={() => setDrawerOpen(false)}
      />

      {/* Drawer слева */}
      <div className={`mob-drawer${drawerOpen ? ' open' : ''}`}>
        <div className="mob-drawer__head">
          <img src="/assets/logo.svg" alt="Hotel Karagat" width="36" height="36" />
          <span>HOTEL KARAGAT</span>
          <button className="mob-drawer__close" onClick={() => setDrawerOpen(false)} aria-label="Закрыть">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <nav className="mob-drawer__nav">
          {DRAWER_ITEMS.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => `mob-drawer__link${isActive ? ' active' : ''}`}
              onClick={() => setDrawerOpen(false)}
            >
              <i className={icon} />
              {tr(label)}
            </NavLink>
          ))}
        </nav>

        <div className="mob-drawer__footer">
          <button className="mob-drawer__theme" onClick={toggle} aria-label="Тема">
            <i className={dark ? 'fa-regular fa-sun' : 'fa-regular fa-moon'} />
            <span>{dark ? tr('Светлая тема') : tr('Тёмная тема')}</span>
          </button>
        </div>
      </div>
    </>
  );
}

