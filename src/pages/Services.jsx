import { useLang } from '../context/LangContext';

const SERVICES = [
  {
    icon: 'fa-solid fa-car',
    key: 'transfer',
    price: '50-100 KGS',
    duration: 'По запросу'
  },
  {
    icon: 'fa-solid fa-utensils',
    key: 'breakfast',
    price: '300 KGS',
    duration: '7:00-10:00'
  },
  {
    icon: 'fa-solid fa-calendar-check',
    key: 'earlyCheckin',
    price: '+500 KGS',
    duration: 'После 10:00'
  },
  {
    icon: 'fa-solid fa-moon',
    key: 'lateCheckout',
    price: '+500 KGS',
    duration: 'До 18:00'
  },
  {
    icon: 'fa-solid fa-water',
    key: 'spa',
    price: '1500+ KGS',
    duration: '1-2 часа'
  },
  {
    icon: 'fa-solid fa-users',
    key: 'conference',
    price: '5000+ KGS',
    duration: '4-8 часов'
  },
  {
    icon: 'fa-solid fa-shirt',
    key: 'laundry',
    price: '200 KGS',
    duration: '24 часа'
  },
  {
    icon: 'fa-solid fa-bicycle',
    key: 'bikeRent',
    price: '300 KGS',
    duration: 'За день'
  },
];

export default function Services() {
  const { tr } = useLang();

  return (
    <div className="page-main">
      <section className="section hero" style={{ minHeight: '40vh' }}>
        <div className="container hero__content">
          <h1>{tr('Услуги и сервис')}</h1>
          <p className="hero__tag">{tr('Расширьте ваш опыт проживания')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>{tr('Дополнительные услуги')}</h2>
          </div>

          <div className="services-grid">
            {SERVICES.map((svc, idx) => (
              <div key={idx} className="service-card reveal">
                <div className="service-card__icon">
                  <i className={svc.icon} />
                </div>
                <h3 className="service-card__title">{tr(svc.key)}</h3>
                <p className="service-card__duration">{svc.duration}</p>
                <p className="service-card__price">{svc.price}</p>
                <p className="service-card__note">{tr('Доступна по запросу')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="section-head">
            <h2>{tr('Как заказать услугу')}</h2>
          </div>
          
          <div className="services-faq">
            <details>
              <summary>{tr('Как заказать трансфер?')}</summary>
              <p>{tr('Напишите нам через WhatsApp или свяжитесь по телефону. Укажите время, количество человек и маршрут.')}</p>
            </details>
            
            <details>
              <summary>{tr('Можно ли заказать услугу прямо в номере?')}</summary>
              <p>{tr('Да, позвоните на рецепцию (доб. 0). Мы организуем услугу в удобное для вас время.')}</p>
            </details>
            
            <details>
              <summary>{tr('Есть ли скидки за долгосрочное проживание?')}</summary>
              <p>{tr('Да! При проживании 7+ ночей — скидка 10%, при 14+ ночах — скидка 15%. Свяжитесь с администратором.')}</p>
            </details>
            
            <details>
              <summary>{tr('Какой способ оплаты услуг?')}</summary>
              <p>{tr('Наличные, карта, банковский перевод. Оплата при получении услуги или по счёту заранее.')}</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
