import { getText, setText } from '../utils/storage.js';

const THEME_KEY = 'karagatTheme';

function renderThemeIcon(themeToggle, isDark) {
  themeToggle.innerHTML = isDark
    ? '<i class="fa-regular fa-sun"></i>'
    : '<i class="fa-regular fa-moon"></i>';
}

export function initTheme({ body, themeToggle }) {
  if (!body || !themeToggle) return;

  const savedTheme = getText(THEME_KEY, 'light');
  const isDark = savedTheme === 'dark';

  body.classList.toggle('dark', isDark);
  renderThemeIcon(themeToggle, isDark);

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const darkEnabled = body.classList.contains('dark');
    setText(THEME_KEY, darkEnabled ? 'dark' : 'light');
    renderThemeIcon(themeToggle, darkEnabled);
  });
}
