import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const translations = {
  en: {
    /* Nav */
    'Главная': 'Home', 'Номера': 'Rooms', 'Галерея': 'Gallery',
    'Контакты': 'Contacts', 'Мы на карте': 'Map', 'Отзывы': 'Reviews', 'Бронь': 'Book',
    /* Hero */
    'Тишина гор, премиальный сервис и атмосфера утонченного отдыха в центре Каракола.':
      'Mountain tranquility, premium service and refined atmosphere in the heart of Karakol.',
    'Забронировать': 'Book now', 'Посмотреть номера': 'View rooms',
    /* About */
    'О нас': 'About us',
    'HOTEL KARAGAT KARAKOL создан для гостей, которым важны комфорт, эстетика и безупречный сервис. Минималистичный интерьер, спокойная атмосфера и внимание к каждой детали делают отдых особенным. Мы расположены в самом сердце Каракола — в нескольких минутах от горных троп, национального парка и живописного озера Иссык-Куль. Каждый номер оформлен с заботой о госте: натуральные материалы, мягкое освещение и продуманное зонирование создают атмосферу уюта и покоя. Наша команда работает круглосуточно, чтобы ваш отдых прошёл без забот.':
      'HOTEL KARAGAT KARAKOL is designed for guests who value comfort, aesthetics and impeccable service. Minimalist interior, calm atmosphere and attention to every detail make your stay special. We are located in the heart of Karakol — minutes from mountain trails, the national park and the scenic Lake Issyk-Kul. Each room is furnished with care: natural materials, soft lighting and thoughtful layout create a cozy and peaceful atmosphere. Our team works 24/7 to make your stay worry-free.',
    /* Amenities */
    'Удобства': 'Amenities',
    'Высокоскоростной Wi-Fi': 'High-speed Wi-Fi', 'Бесплатная парковка': 'Free parking',
    'Ресепшн 24/7': '24/7 reception', 'Завтрак и кофе-зона': 'Breakfast & coffee area',
    /* Stats */
    'лет опыта': 'years of experience', 'довольных гостей': 'happy guests',
    'средний рейтинг': 'average rating', 'часа к вашим услугам': 'hours at your service',
    /* Offers */
    'Спецпредложения': 'Special offers', 'Выбрать пакет': 'Choose a package',
    '2 ночи + завтрак + поздний выезд до 16:00.': '2 nights + breakfast + late checkout until 16:00.',
    '-15% до конца месяца': '-15% until end of month',
    'Семейный номер, детская кроватка и трансфер.': 'Family room, baby crib and airport transfer.',
    '-12% при брони от 3 ночей': '-12% when booking 3+ nights',
    'Декор номера, фруктовая тарелка и завтрак в номер.': 'Room decoration, fruit plate and breakfast in bed.',
    'Подарочный комплимент от отеля': 'Complimentary gift from the hotel',
    /* Rooms preview */
    'Превью номеров': 'Room preview', 'Подробнее': 'More details',
    'Стандарт': 'Standard', 'Семейный': 'Family', 'Улучшенный': 'Deluxe',
    'Светлый номер с рабочей зоной и комфортной кроватью.': 'Bright room with workspace and comfortable bed.',
    'Простор для всей семьи с отдельной зоной отдыха.': 'Spacious room for the whole family with separate lounge.',
    'Премиальный интерьер и расширенный набор услуг.': 'Premium interior and extended range of services.',
    /* Rooms page */
    'Выберите подходящий формат проживания и отправьте бронь в один клик.': 'Choose the right room type and book in one click.',
    'Уютный номер для 1-2 гостей с рабочей зоной и удобной кроватью.': 'Cozy room for 1-2 guests with workspace and comfortable bed.',
    'Просторный номер для 3-4 гостей, идеально для семейного отдыха.': 'Spacious room for 3-4 guests, ideal for family vacation.',
    'Премиальный номер с панорамным видом и расширенным сервисом.': 'Premium room with panoramic view and extended service.',
    'от 4 500 KGS / ночь': 'from 4,500 KGS / night',
    'от 6 900 KGS / ночь': 'from 6,900 KGS / night',
    'от 8 900 KGS / ночь': 'from 8,900 KGS / night',
    /* Compare */
    'Сравнение номеров': 'Room comparison',
    'Что включено в каждый тип номера — чтобы выбрать было проще.': 'What is included in each room type — to make choosing easier.',
    'Особенность': 'Feature', 'Цена от': 'Price from',
    'Гостей': 'Guests', 'Площадь': 'Area', 'Завтрак включён': 'Breakfast included',
    'Мини-холодильник': 'Mini fridge', 'Детская кроватка': 'Baby crib',
    'Панорамный вид': 'Panoramic view', 'Халат и тапочки': 'Robe & slippers',
    'Ванна / душ': 'Bath / shower', 'Душ': 'Shower', 'Ванна + душ': 'Bath + shower', 'Джакузи': 'Jacuzzi',
    /* Pricing */
    'Тарифы и пакеты': 'Rates & packages',
    'Выберите подходящий пакет — все включают завтрак и Wi-Fi.': 'Choose a package — all include breakfast and Wi-Fi.',
    'Популярный': 'Popular', 'KGS / ночь': 'KGS / night',
    '1–2 гостя': '1–2 guests', '22 м², двуспальная кровать': '22 m², double bed',
    'Душевая кабина': 'Shower cabin', '3–4 гостя': '3–4 guests',
    '36 м², раздельные зоны': '36 m², separate zones',
    '1–3 гостя': '1–3 guests', '45 м², панорамный вид': '45 m², panoramic view',
    'Поздний выезд до 14:00': 'Late checkout until 14:00',
    /* Booking */
    'Бронирование': 'Booking',
    'Заполните форму, и мы свяжемся с вами для подтверждения брони в ближайшее время.': 'Fill in the form and we will contact you to confirm the booking shortly.',
    'Доступность на 14 дней': 'Availability for 14 days',
    'занято': 'booked', 'доступно': 'available',
    'Забронировать номер': 'Book a room',
    'Заполните форму, и мы свяжемся с вами для подтверждения.': 'Fill in the form and we will contact you to confirm.',
    'Имя': 'Name', 'Например: Айгерим': 'E.g.: Alice', 'Телефон': 'Phone',
    'Дата заезда': 'Check-in', 'Дата выезда': 'Check-out', 'Кол-во гостей': 'Guests',
    'Отправить бронь': 'Send booking',
    'Пожалуйста, заполните все поля.': 'Please fill in all fields.',
    'Дата выезда должна быть позже даты заезда.': 'Check-out must be later than check-in.',
    'На эти даты номер уже занят. Выберите другой период.': 'The room is already booked for these dates. Please choose another period.',
    'Бронь отправлена! Мы свяжемся с вами для подтверждения.': 'Booking sent! We will contact you to confirm.',
    /* Reviews */
    'Отзывы гостей': 'Guest reviews',
    'Мнение наших гостей о проживании в HOTEL KARAGAT KARAKOL.': 'Our guests\' impressions of staying at HOTEL KARAGAT KARAKOL.',
    'Оставить отзыв': 'Leave a review', 'Ваше имя': 'Your name',
    'Поделитесь впечатлением о проживании': 'Share your impression of your stay',
    'Ваш отзыв': 'Your review', 'Ваша оценка': 'Your rating',
    'Отправить отзыв': 'Send review', 'Новые отзывы': 'Recent reviews',
    'Пока отзывов нет. Будьте первым гостем, кто оставит отзыв.': 'No reviews yet. Be the first to leave a review.',
    'Пожалуйста, заполните имя и текст отзыва.': 'Please fill in your name and review text.',
    'Спасибо! Ваш отзыв добавлен.': 'Thank you! Your review has been added.',
    /* Contact */
    'Телефон:': 'Phone:', 'Email:': 'Email:', 'Адрес:': 'Address:',
    'Открыть раздел «Мы на карте»': 'Open map section',
    'Частые вопросы': 'FAQ',
    'Во сколько заезд и выезд?': 'What are check-in and check-out times?',
    'Заезд с 14:00, выезд до 12:00. Ранний заезд доступен при наличии свободных номеров.': 'Check-in from 14:00, check-out by 12:00. Early check-in available subject to room availability.',
    'Можно ли отменить бронь?': 'Can I cancel my booking?',
    'Да, бесплатная отмена возможна за 48 часов до даты заезда.': 'Yes, free cancellation is possible 48 hours before check-in.',
    'Есть ли трансфер из аэропорта?': 'Is there airport transfer?',
    'Да, трансфер доступен по предварительному запросу при бронировании.': 'Yes, transfer is available upon prior request when booking.',
    /* Gallery */
    'Показать еще': 'Show more', 'Все': 'All', 'Экстерьер': 'Exterior', 'Интерьер': 'Interior',
    /* Header/Drawer */
    'Светлая тема': 'Light theme', 'Тёмная тема': 'Dark theme',
    'Напишите нам': 'Contact us',
  },
  de: {
    'Главная': 'Startseite', 'Номера': 'Zimmer', 'Галерея': 'Galerie',
    'Контакты': 'Kontakt', 'Мы на карте': 'Karte', 'Отзывы': 'Bewertungen', 'Бронь': 'Buchen',
    'О нас': 'Über uns', 'Удобства': 'Annehmlichkeiten', 'Забронировать': 'Jetzt buchen',
    'Посмотреть номера': 'Zimmer anzeigen', 'Спецпредложения': 'Spezialangebote',
    'Бронирование': 'Buchung', 'Отзывы гостей': 'Gästebewertungen',
  },
  ar: {
    'Главная': 'الرئيسية', 'Номера': 'الغرف', 'Галерея': 'المعرض',
    'Контакты': 'جهة الاتصال', 'Мы на карте': 'الخريطة', 'Отзывы': 'التقييمات', 'Бронь': 'حجز',
    'О нас': 'عنا', 'Удобства': 'المرافق', 'Забронировать': 'احجز الآن',
    'Посмотреть номера': 'عرض الغرف', 'Спецпредложения': 'عروض خاصة',
    'Бронирование': 'الحجز', 'Отзывы гостей': 'تقييمات الضيوف',
  },
  fr: {
    'Главная': 'Accueil', 'Номера': 'Chambres', 'Галерея': 'Galerie',
    'Контакты': 'Contact', 'Мы на карте': 'Carte', 'Отзывы': 'Avis', 'Бронь': 'Réserver',
    'О нас': 'À propos', 'Удобства': 'Commodités', 'Забронировать': 'Réserver maintenant',
    'Посмотреть номера': 'Afficher les chambres', 'Спецпредложения': 'Offres spéciales',
    'Бронирование': 'Réservation', 'Отзывы гостей': 'Avis des clients',
  },
  zh: {
    'Главная': '首页', 'Номера': '房间', 'Галерея': '图库',
    'Контакты': '联系', 'Мы на карте': '地图', 'Отзывы': '评价', 'Бронь': '预订',
    'О нас': '关于我们', 'Удобства': '便利设施', 'Забронировать': '立即预订',
    'Посмотреть номера': '查看房间', 'Спецпредложения': '特别优惠',
    'Бронирование': '预订', 'Отзывы гостей': '客人评价',
  },
  kk: {
    'Главная': 'Басты бет', 'Номера': 'Бөлмелер', 'Галерея': 'Галерея',
    'Контакты': 'Байланыс', 'Мы на карте': 'Картада біз', 'Отзывы': 'Пікірлер', 'Бронь': 'Брондау',
    'О нас': 'Біз туралы', 'Удобства': 'Ыңғайлылықтар', 'Забронировать': 'Қазір брондаңыз',
    'Посмотреть номера': 'Бөлмелерді қарау', 'Спецпредложения': 'Арнайы ұсыныстар',
    'Бронирование': 'Брондау', 'Отзывы гостей': 'Қонақтардың пікірлері',
  },
  ja: {
    'Главная': 'ホーム', 'Номера': '客室', 'Галерея': 'ギャラリー',
    'Контакты': 'お問い合わせ', 'Мы на карте': 'マップ', 'Отзывы': 'レビュー', 'Бронь': '予約',
    'О нас': '私たちについて', 'Удобства': '設備', 'Забронировать': '今すぐ予約',
    'Посмотреть номера': '客室を表示', 'Спецпредложения': '特別オファー',
    'Бронирование': '予約', 'Отзывы гостей': 'ゲストレビュー',
  },
  ko: {
    'Главная': '홈', 'Номера': '객실', 'Галерея': '갤러리',
    'Контакты': '문의', 'Мы на карте': '지도', 'Отзывы': '리뷰', 'Бронь': '예약',
    'О нас': '소개', 'Удобства': '편의시설', 'Забронировать': '지금 예약하세요',
    'Посмотреть номера': '객실 보기', 'Спецпредложения': '특별 오퍼',
    'Бронирование': '예약', 'Отзывы гостей': '게스트 리뷰',
  },
  kg: {
    /* Nav */
    'Главная': 'Башкы бет', 'Номера': 'Бөлмөлөр', 'Галерея': 'Галерея',
    'Контакты': 'Байланыш', 'Мы на карте': 'Картада биз', 'Отзывы': 'Пикирлер', 'Бронь': 'Брондоо',
    /* Hero */
    'Тишина гор, премиальный сервис и атмосфера утонченного отдыха в центре Каракола.':
      'Тоолордун тынчтыгы, премиум кызмат жана Караколдун борборундагы өзгөчө эс алуу атмосферасы.',
    'Забронировать': 'Брондоо', 'Посмотреть номера': 'Бөлмөлөрдү көрүү',
    /* About */
    'О нас': 'Биз жөнүндө',
    'HOTEL KARAGAT KARAKOL создан для гостей, которым важны комфорт, эстетика и безупречный сервис. Минималистичный интерьер, спокойная атмосфера и внимание к каждой детали делают отдых особенным. Мы расположены в самом сердце Каракола — в нескольких минутах от горных троп, национального парка и живописного озера Иссык-Куль. Каждый номер оформлен с заботой о госте: натуральные материалы, мягкое освещение и продуманное зонирование создают атмосферу уюта и покоя. Наша команда работает круглосуточно, чтобы ваш отдых прошёл без забот.':
      'HOTEL KARAGAT KARAKOL конокторго, алардын ыңгайлуулугу, эстетикасы жана мыкты кызматы маанилүү болгондорго арналган. Минималисттик интерьер, тынч атмосфера жана ар бир деталга көңүл буруу эс алууну өзгөчө кылат. Биз Каракол шаарынын борборунда жайгашканбыз — тоо жолдорунан, улуттук паркан жана сонун Ысык-Көлдөн бир нече мүнөттүн аралыгында.',
    /* Amenities */
    'Удобства': 'Ыңгайлуулуктар',
    'Высокоскоростной Wi-Fi': 'Тез Wi-Fi', 'Бесплатная парковка': 'Акысыз парковка',
    'Ресепшн 24/7': 'Ресепшн 24/7', 'Завтрак и кофе-зона': 'Эртең мененки тамак жана кофе-зона',
    /* Stats */
    'лет опыта': 'жылдык тажрыйба', 'довольных гостей': 'ыраазы конок',
    'средний рейтинг': 'орточо баа', 'часа к вашим услугам': 'саат кызматта',
    /* Offers */
    'Спецпредложения': 'Атайын сунуштар', 'Выбрать пакет': 'Пакетти тандоо',
    '2 ночи + завтрак + поздний выезд до 16:00.': '2 түн + эртең мененки тамак + кеч чыгуу 16:00 чейин.',
    '-15% до конца месяца': 'Айдын аягына чейин -15%',
    'Семейный номер, детская кроватка и трансфер.': 'Үй-бүлөлүк бөлмө, бала бешиги жана трансфер.',
    '-12% при брони от 3 ночей': '3 же андан ашык түн брондоодо -12%',
    'Декор номера, фруктовая тарелка и завтрак в номер.': 'Бөлмө декору, жемиш тарелкасы жана бөлмөгө эртең мененки тамак.',
    'Подарочный комплимент от отеля': 'Мейманкананын белеги',
    /* Rooms preview */
    'Превью номеров': 'Бөлмөлөрдүн көрүнүшү', 'Подробнее': 'Кененирээк',
    'Стандарт': 'Стандарт', 'Семейный': 'Үй-бүлөлүк', 'Улучшенный': 'Жакшыртылган',
    'Светлый номер с рабочей зоной и комфортной кроватью.': 'Жумуш зонасы жана ыңгайлуу керебети бар жарык бөлмө.',
    'Простор для всей семьи с отдельной зоной отдыха.': 'Бүтүндөй үй-бүлө үчүн кеңири бөлмө.',
    'Премиальный интерьер и расширенный набор услуг.': 'Премиум интерьер жана кеңейтилген кызматтар.',
    /* Rooms page */
    'Выберите подходящий формат проживания и отправьте бронь в один клик.': 'Ылайыктуу бөлмө түрүн тандаңыз жана бир чертүү менен брондоңуз.',
    'Уютный номер для 1-2 гостей с рабочей зоной и удобной кроватью.': '1-2 конок үчүн жумуш зонасы жана ыңгайлуу керебети бар бөлмө.',
    'Просторный номер для 3-4 гостей, идеально для семейного отдыха.': '3-4 конок үчүн кеңири бөлмө, үй-бүлөлүк эс алуу үчүн идеалдуу.',
    'Премиальный номер с панорамным видом и расширенным сервисом.': 'Панорамалык көрүнүш жана кеңейтилген кызмат менен премиум бөлмө.',
    'от 4 500 KGS / ночь': '4 500 KGS / түндөн баштап',
    'от 6 900 KGS / ночь': '6 900 KGS / түндөн баштап',
    'от 8 900 KGS / ночь': '8 900 KGS / түндөн баштап',
    /* Compare */
    'Сравнение номеров': 'Бөлмөлөрдү салыштыруу',
    'Что включено в каждый тип номера — чтобы выбрать было проще.': 'Тандоону жеңилдетүү үчүн ар бир бөлмө түрүнө эмне кирет.',
    'Особенность': 'Өзгөчөлүк', 'Цена от': 'Баасы',
    'Гостей': 'Конок', 'Площадь': 'Аянт', 'Завтрак включён': 'Эртең мененки тамак кирет',
    'Мини-холодильник': 'Мини-муздаткыч', 'Детская кроватка': 'Бала бешиги',
    'Панорамный вид': 'Панорамалык көрүнүш', 'Халат и тапочки': 'Халат жана тапочкалар',
    'Ванна / душ': 'Ванна / душ', 'Душ': 'Душ', 'Ванна + душ': 'Ванна + душ', 'Джакузи': 'Джакузи',
    /* Pricing */
    'Тарифы и пакеты': 'Тарифтер жана пакеттер',
    'Выберите подходящий пакет — все включают завтрак и Wi-Fi.': 'Ылайыктуу пакетти тандаңыз — баарына эртең мененки тамак жана Wi-Fi кирет.',
    'Популярный': 'Популярдуу', 'KGS / ночь': 'KGS / түн',
    '1–2 гостя': '1–2 конок', '22 м², двуспальная кровать': '22 м², эки кишилик керебет',
    'Душевая кабина': 'Душ кабинкасы', '3–4 гостя': '3–4 конок',
    '36 м², раздельные зоны': '36 м², өзүнчө зоналар',
    '1–3 гостя': '1–3 конок', '45 м², панорамный вид': '45 м², панорамалык көрүнүш',
    'Поздний выезд до 14:00': '14:00 чейин кеч чыгуу',
    /* Booking */
    'Бронирование': 'Брондоо',
    'Заполните форму, и мы свяжемся с вами для подтверждения брони в ближайшее время.': 'Форманы толтуруңуз, биз жакын арада брондоону ырастоо үчүн сизге кайрылабыз.',
    'Доступность на 14 дней': '14 күнгө жеткиликтүүлүк',
    'занято': 'ээленген', 'доступно': 'бош',
    'Забронировать номер': 'Бөлмө брондоо',
    'Заполните форму, и мы свяжемся с вами для подтверждения.': 'Форманы толтуруңуз, биз ырастоо үчүн сизге кайрылабыз.',
    'Имя': 'Аты', 'Например: Айгерим': 'Мисалы: Айгерим', 'Телефон': 'Телефон',
    'Дата заезда': 'Кирүү күнү', 'Дата выезда': 'Чыгуу күнү', 'Кол-во гостей': 'Конок саны',
    'Отправить бронь': 'Брон жөнөтүү',
    'Пожалуйста, заполните все поля.': 'Бардык талааларды толтуруңуз.',
    'Дата выезда должна быть позже даты заезда.': 'Чыгуу күнү кирүү күнүнөн кийин болушу керек.',
    'На эти даты номер уже занят. Выберите другой период.': 'Бул күндөргө бөлмө мурунтан ээленген. Башка мезгилди тандаңыз.',
    'Бронь отправлена! Мы свяжемся с вами для подтверждения.': 'Брон жөнөтүлдү! Ырастоо үчүн сизге кайрылабыз.',
    /* Reviews */
    'Отзывы гостей': 'Коноктордун пикирлери',
    'Мнение наших гостей о проживании в HOTEL KARAGAT KARAKOL.': 'HOTEL KARAGAT KARAKOLдо жашоо жөнүндө коноктордун пикири.',
    'Оставить отзыв': 'Пикир калтыруу', 'Ваше имя': 'Атыңыз',
    'Поделитесь впечатлением о проживании': 'Жашоо жөнүндөгү таасириңизди бөлүшүңүз',
    'Ваш отзыв': 'Пикириңиз', 'Ваша оценка': 'Баалооңуз',
    'Отправить отзыв': 'Пикир жөнөтүү', 'Новые отзывы': 'Жаңы пикирлер',
    'Пока отзывов нет. Будьте первым гостем, кто оставит отзыв.': 'Азырынча пикир жок. Биринчи конок болуңуз.',
    'Пожалуйста, заполните имя и текст отзыва.': 'Атыңызды жана пикир текстин толтуруңуз.',
    'Спасибо! Ваш отзыв добавлен.': 'Рахмат! Пикириңиз кошулду.',
    /* Contact */
    'Телефон:': 'Телефон:', 'Email:': 'Email:', 'Адрес:': 'Дарек:',
    'Открыть раздел «Мы на карте»': '"Картада биз" бөлүмүн ачуу',
    'Частые вопросы': 'Көп берилген суроолор',
    'Во сколько заезд и выезд?': 'Кирүү жана чыгуу убактысы кандай?',
    'Заезд с 14:00, выезд до 12:00. Ранний заезд доступен при наличии свободных номеров.': 'Кирүү 14:00дан, чыгуу 12:00гө чейин. Эрте кирүү бош бөлмөлөр болгон учурда жеткиликтүү.',
    'Можно ли отменить бронь?': 'Бронду жокко чыгарса болобу?',
    'Да, бесплатная отмена возможна за 48 часов до даты заезда.': 'Ооба, кирүү күнүнө чейин 48 саат мурун акысыз жокко чыгаруу мүмкүн.',
    'Есть ли трансфер из аэропорта?': 'Аэропорттон трансфер барбы?',
    'Да, трансфер доступен по предварительному запросу при бронировании.': 'Ооба, брондоодо алдын ала суроо боюнча трансфер жеткиликтүү.',
    /* Gallery */
    'Показать еще': 'Дагы көрсөтүү', 'Все': 'Баары', 'Экстерьер': 'Сырт', 'Интерьер': 'Ичи',
    /* Header/Drawer */
    'Светлая тема': 'Жарык теме', 'Тёмная тема': 'Күңүрт теме',
    'Напишите нам': 'Бизге жазыңыз',
  },
};

const FALLBACK_LANGUAGE_CODES = [
  'af', 'am', 'ar', 'as', 'az', 'be', 'bg', 'bn', 'bo', 'bs', 'ca', 'cs', 'cy', 'da', 'de', 'dv',
  'el', 'en', 'eo', 'es', 'et', 'eu', 'fa', 'fi', 'fil', 'fj', 'fo', 'fr', 'ga', 'gd', 'gl', 'gn',
  'gu', 'ha', 'he', 'hi', 'hr', 'ht', 'hu', 'hy', 'id', 'ig', 'is', 'it', 'ja', 'jv', 'ka', 'kk',
  'km', 'kn', 'ko', 'ku', 'ky', 'la', 'lb', 'lo', 'lt', 'lv', 'mg', 'mi', 'mk', 'ml', 'mn', 'mr',
  'ms', 'mt', 'my', 'ne', 'nl', 'no', 'ny', 'om', 'or', 'pa', 'pl', 'ps', 'pt', 'qu', 'ro', 'ru',
  'rw', 'sa', 'sd', 'si', 'sk', 'sl', 'sm', 'sn', 'so', 'sq', 'sr', 'st', 'su', 'sv', 'sw', 'ta',
  'te', 'tg', 'th', 'ti', 'tk', 'tl', 'tn', 'to', 'tr', 'tt', 'ug', 'uk', 'ur', 'uz', 'vi', 'xh',
  'yi', 'yo', 'zh', 'zu',
];

function getRawLanguageCodes() {
  const set = new Set(FALLBACK_LANGUAGE_CODES);
  if (typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function') {
    try {
      Intl.supportedValuesOf('language').forEach(code => {
        const base = String(code).split('-')[0].toLowerCase();
        if (/^[a-z]{2,3}$/.test(base)) set.add(base);
      });
    } catch {
      // ignore and keep fallback list
    }
  }
  return Array.from(set);
}

function getDisplayName(code, locale) {
  try {
    const dn = new Intl.DisplayNames([locale], { type: 'language' });
    return dn.of(code) || code.toUpperCase();
  } catch {
    return code.toUpperCase();
  }
}

function buildLanguages() {
  const codes = getRawLanguageCodes();
  const mapped = codes.map(code => {
    const uiCode = code === 'ky' ? 'kg' : code;
    return {
      code: uiCode,
      engineCode: code,
      name: getDisplayName(code, 'en'),
      native: getDisplayName(code, code),
      flag: uiCode === 'ru' ? '🇷🇺' : uiCode === 'en' ? '🇬🇧' : uiCode === 'kg' ? '🇰🇬' : '🌐',
    };
  });

  const unique = [];
  const seen = new Set();
  mapped.forEach(item => {
    if (!seen.has(item.code)) {
      unique.push(item);
      seen.add(item.code);
    }
  });

  unique.sort((a, b) => {
    if (a.code === 'ru') return -1;
    if (b.code === 'ru') return 1;
    if (a.code === 'en') return -1;
    if (b.code === 'en') return 1;
    if (a.code === 'kg') return -1;
    if (b.code === 'kg') return 1;
    return a.name.localeCompare(b.name);
  });

  return unique;
}

const ALL_LANGUAGES = buildLanguages();
const LANG_ENGINE_CODE = ALL_LANGUAGES.reduce((acc, item) => {
  acc[item.code] = item.engineCode;
  return acc;
}, {});

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('karagat_lang') || 'ru');
  const [dynamicTranslations, setDynamicTranslations] = useState(() => {
    try {
      const raw = localStorage.getItem('karagat_dynamic_translations');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  const pendingRef = useRef(new Set());

  useEffect(() => {
    document.documentElement.lang = lang === 'kg' ? 'ky' : lang;
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem('karagat_dynamic_translations', JSON.stringify(dynamicTranslations));
    } catch {
      // ignore storage quota issues
    }
  }, [dynamicTranslations]);

  function requestAutoTranslation(text, targetUiCode) {
    const targetCode = LANG_ENGINE_CODE[targetUiCode] || targetUiCode;
    const key = `${targetCode}::${text}`;
    if (pendingRef.current.has(key)) return;

    pendingRef.current.add(key);

    fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(targetCode)}&dt=t&q=${encodeURIComponent(text)}`)
      .then(r => r.json())
      .then(data => {
        const parts = Array.isArray(data?.[0]) ? data[0] : [];
        const translated = parts.map(chunk => chunk?.[0] || '').join('').trim();
        if (!translated || translated === text) return;

        setDynamicTranslations(prev => ({
          ...prev,
          [targetUiCode]: {
            ...(prev[targetUiCode] || {}),
            [text]: translated,
          },
        }));
      })
      .catch(() => {
        // ignore network/translate errors and keep source text
      })
      .finally(() => {
        pendingRef.current.delete(key);
      });
  }

  function tr(text) {
    if (typeof text !== 'string' || !text.trim()) return text;
    if (lang === 'ru') return text;

    const staticTranslated = (translations[lang] || {})[text];
    if (staticTranslated) return staticTranslated;

    const dynamicTranslated = dynamicTranslations[lang]?.[text];
    if (dynamicTranslated) return dynamicTranslated;

    requestAutoTranslation(text, lang);
    return text;
  }

  function changeLang(l) {
    setLang(l);
    localStorage.setItem('karagat_lang', l);
  }

  const value = useMemo(() => ({
    lang,
    changeLang,
    tr,
    languages: ALL_LANGUAGES,
  }), [lang, dynamicTranslations]);

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
