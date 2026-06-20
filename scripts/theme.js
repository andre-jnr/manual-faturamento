(function () {
  const STORAGE_KEY = 'manual-faturamento-theme';
  const html = document.documentElement;

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    const icon = document.getElementById('themeIcon');
    const label = document.getElementById('themeLabel');

    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      if (icon) icon.textContent = '☀️';
      if (label) label.textContent = 'Claro';
    } else {
      html.removeAttribute('data-theme');
      if (icon) icon.textContent = '🌙';
      if (label) label.textContent = 'Escuro';
    }
  }

  let current = getInitialTheme();

  // Aplica imediatamente (antes do DOMContentLoaded) para evitar flash
  if (current === 'dark') html.setAttribute('data-theme', 'dark');

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(current);

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        current = current === 'dark' ? 'light' : 'dark';
        applyTheme(current);
        localStorage.setItem(STORAGE_KEY, current);
      });
    }

    // Acompanha mudança no sistema (apenas se o usuário não escolheu manualmente)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        current = e.matches ? 'dark' : 'light';
        applyTheme(current);
      }
    });
  });
})();