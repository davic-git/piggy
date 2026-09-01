(() => {
  const form = document.getElementById('loginForm');
  const phone = document.getElementById('phone');
  if (!form || !phone) return;
  phone.addEventListener('input', (event) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) event.target.value = digits.replace(/^(\d*)$/, '($1');
    else if (digits.length <= 7) event.target.value = digits.replace(/^(\d{2})(\d*)$/, '($1) $2');
    else event.target.value = digits.replace(/^(\d{2})(\d{5})(\d{0,4})$/, '($1) $2-$3');
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.getElementById('formStatus');
    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) status.textContent = 'Revise os campos destacados antes de continuar.';
      return;
    }
    if (status) status.textContent = 'Dados validados. A integração de autenticação ainda não está disponível.';
  });
})();
