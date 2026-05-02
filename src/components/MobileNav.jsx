import { useState } from 'react';
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

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const { lang, changeLang, tr } = useLang();

  return (
    <>
      {/* ── Бургер-кнопка вверху ── */}
      <button
        className="mob-burger"
        aria-label="Открыть меню"
        onClick={() => setOpen(true)}
      >
        <i className="fa-solid fa-bars" />
      </button>

      {/* ── Overlay ── */}
      <div
        className={`mob-drawer-overlay${open ? ' visible' : ''}`}
        onClick={() => setOpen(false)}
      />

      {/* ── Drawer справа ── */}
      <div className={`mob-drawer${open ? ' open' : ''}`}>
        <div className="mob-drawer__head">
          <img src="/assets/logo.svg" alt="Hotel Karagat" width="36" height="36" />
          <span>HOTEL KARAGAT</span>
          <button className="mob-drawer__close" onClick={() => setOpen(false)} aria-label="Закрыть">
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
              onClick={() => setOpen(false)}
            >
              <i className={icon} />
              {tr(label)}
            </NavLink>
          ))}
        </nav>

        <div className="mob-drawer__footer">
          <button className="mob-drawer__theme" onClick={toggle} aria-label="Тема">
            <i className={dark ? 'fa-regular fa-sun' : 'fa-regular fa-moon'} />
            <span>{dark ? 'Светлая тема' : 'Тёмная тема'}</span>
          </button>
          <div className="mob-drawer__langs">
            {['ru', 'en', 'kg'].map(l => (
              <button
                key={l}
                className={`lang-btn${lang === l ? ' active' : ''}`}
                onClick={() => changeLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
