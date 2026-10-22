(() => {
  const form = document.getElementById('loginForm');
  const phone = document.getElementById('phone');

  if (!form || !phone) return;

  // Formatação automática do telefone
  phone.addEventListener('input', (event) => {
    const digits = event.target.value.replace(/\D/g, '').slice(0, 11);

    if (digits.length <= 2) {
      event.target.value = digits.replace(/^(\d*)$/, '($1');
    } else if (digits.length <= 7) {
      event.target.value = digits.replace(/^(\d{2})(\d*)$/, '($1) $2');
    } else {
      event.target.value = digits.replace(
        /^(\d{2})(\d{5})(\d{0,4})$/,
        '($1) $2-$3'
      );
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const status = document.getElementById('formStatus');

    const name = document.getElementById('name');
    const surname = document.getElementById('surname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const terms = document.getElementById('rememberMe');

    const nameError = document.getElementById('nameError');
    const surnameError = document.getElementById('surnameError');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Limpar erros anteriores
    nameError.textContent = '';
    surnameError.textContent = '';
    phoneError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';
    if (status) status.textContent = '';

    let valido = true;

    // Nome
    if (name.value.trim().length < 2) {
      nameError.textContent = 'Nome inválido.';
      valido = false;
    }

    // Sobrenome
    if (surname.value.trim().length < 2) {
      surnameError.textContent = 'Sobrenome inválido.';
      valido = false;
    }

    // Telefone
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (!telefoneRegex.test(phone.value)) {
      phoneError.textContent =
        'Telefone inválido. Use (XX) XXXXX-XXXX.';
      valido = false;
    }

    // E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value)) {
      emailError.textContent = 'E-mail inválido.';
      valido = false;
    }

    // Senha
    const senhaRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^&*-]).{8,25}$/;

    if (!senhaRegex.test(password.value)) {
      passwordError.textContent =
        'Senha inválida. Use maiúscula, minúscula, número e caractere especial.';
      valido = false;
    }

    // Termos
    if (!terms.checked) {
      if (status) {
        status.textContent =
          'Você precisa aceitar os termos de uso.';
      }
      valido = false;
    }

    // Se houver erro, não entra
    if (!valido) return;

    // Salva apenas uma indicação local de login
    localStorage.setItem('piggyLogado', 'true');

    if (status) {
      status.textContent =
        'Dados validados! Login realizado com sucesso.';
    }

    // Vai para o dashboard original do projeto
    setTimeout(() => {
      window.location.href = 'Sidebar/Dashboard/index.html';
    }, 1000);
  });
})();
