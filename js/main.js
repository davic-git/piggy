(() => {
  const body = document.body;
  const sidebar = document.querySelector('.sidebar');
  const menuButton = document.querySelector('.mobile-menu-btn');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const closeButton = document.querySelector('.sidebar-close');
  const mobile = window.matchMedia('(max-width: 1024px)');
  const collapseButton = document.querySelector('.sidebar__collapse-btn');
  // Bloqueia o conteúdo atrás do menu apenas enquanto o drawer está aberto.
  const background = [...document.querySelectorAll('.content-area, .languages-page > .header, .languages-page .main')];
  const closeMenu = (restoreFocus = false) => {
    body.classList.remove('sidebar-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Abrir menu');
    background.forEach((element) => { element.inert = false; });
    if (restoreFocus) menuButton?.focus();
    if (sidebar) {
      sidebar.inert = mobile.matches;
      sidebar.removeAttribute('role');
      sidebar.removeAttribute('aria-modal');
    }
  };
  menuButton?.addEventListener('click', () => {
    if (!sidebar || !mobile.matches) return;
    body.classList.add('sidebar-open');
    sidebar.inert = false;
    sidebar.setAttribute('role', 'dialog');
    sidebar.setAttribute('aria-modal', 'true');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'Fechar menu');
    closeButton?.focus();
    background.forEach((element) => { element.inert = true; });
  });
  backdrop?.addEventListener('click', () => closeMenu(true));
  closeButton?.addEventListener('click', () => closeMenu(true));
  document.addEventListener('keydown', (event) => {
    if (!body.classList.contains('sidebar-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); closeMenu(true); }
    if (event.key === 'Tab') {
      const focusable = [...sidebar.querySelectorAll('a[href], button:not(:disabled), [tabindex="0"]')]
        .filter((element) => element.getClientRects().length && getComputedStyle(element).visibility !== 'hidden');
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }
  });
  document.querySelectorAll('.sidebar a').forEach((link) => link.addEventListener('click', () => closeMenu()));
  mobile.addEventListener('change', () => closeMenu(sidebar?.contains(document.activeElement) && mobile.matches));
  closeMenu();
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
