export function getJson(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getText(key, fallback = '') {
  return localStorage.getItem(key) ?? fallback;
}

export function setText(key, value) {
  localStorage.setItem(key, value);
}
