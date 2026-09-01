(() => {
  const body = document.body;
  const menuButton = document.querySelector('.mobile-menu-btn');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const collapseButton = document.querySelector('.sidebar__collapse-btn');
  const closeMenu = () => {
    body.classList.remove('sidebar-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
  };
  menuButton?.addEventListener('click', () => {
    const open = body.classList.toggle('sidebar-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });
  backdrop?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  document.querySelectorAll('.sidebar a').forEach((link) => link.addEventListener('click', closeMenu));
  collapseButton?.addEventListener('click', () => {
    const collapsed = body.classList.toggle('sidebar-collapsed');
    collapseButton.setAttribute('aria-expanded', String(!collapsed));
    collapseButton.setAttribute('aria-label', collapsed ? 'Expandir menu' : 'Recolher menu');
    const label = collapseButton.querySelector('.sidebar__collapse-label');
    const icon = collapseButton.querySelector('.material-symbols-rounded');
    if (label) label.textContent = collapsed ? 'Expandir menu' : 'Recolher menu';
    if (icon) icon.textContent = collapsed ? 'chevron_right' : 'chevron_left';
  });
  let toast;
  const announce = (message) => {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'app-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.append(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(announce.timer);
    announce.timer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
  };
  document.querySelectorAll('[data-placeholder-action]').forEach((button) => {
    button.addEventListener('click', () => announce(`${button.textContent.trim()}: recurso em desenvolvimento.`));
  });
  document.querySelectorAll('.language-selector__button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.language-selector__button').forEach((item) => item.removeAttribute('aria-pressed'));
      button.setAttribute('aria-pressed', 'true');
      announce(`${button.textContent.trim()} selecionado.`);
    });
  });
})();
