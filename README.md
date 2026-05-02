# HOTEL KARAGAT KARAKOL

Большая модульная структура проекта (frontend only), где каждая зона сайта вынесена в отдельные файлы.

## Структура

- `index.html` - точка входа страницы
- `src/styles/main.css` - агрегатор всех стилей
- `src/styles/tokens.css` - переменные темы и dark-mode токены
- `src/styles/base.css` - глобальные базовые стили
- `src/styles/layout.css` - контейнеры, сетки, общая компоновка
- `src/styles/components/` - стили компонентов (header, кнопки, карточки, формы, lightbox)
- `src/styles/sections/` - стили секций (hero, rooms, gallery и т.д.)
- `src/styles/utilities/` - анимации и адаптивные медиа-правила
- `src/js/main.js` - bootstrap приложения
- `src/js/config/selectors.js` - единая точка DOM-селекторов
- `src/js/modules/` - функциональные модули (theme, booking, gallery, reveal, navigation)
- `src/js/utils/storage.js` - helper-функции для localStorage
- `src/assets/images/` - папка под локальные изображения
- `src/assets/icons/` - папка под локальные иконки

## Что уже работает

- Hero, About, Rooms, Booking, Gallery, Amenities, Contacts
- Валидация формы бронирования
- Сохранение заявок в localStorage
- Темная тема с сохранением выбора
- Анимации появления блоков при скролле
- Lightbox для галереи
- Кнопка "вверх"
- Loader при загрузке
- Мобильная навигация

## Запуск

Просто откройте `index.html` в браузере.
