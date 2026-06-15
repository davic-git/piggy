const telInput = document.getElementById('phone');

telInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');

    value = value.slice(0, 11);

    if (value.length <= 2) {
        value = value.replace(/^(\d*)$/, '($1');
    } else if (value.length <= 7) {
        value = value.replace(/^(\d{2})(\d*)$/, '($1) $2');
    } else {
        value = value.replace(
            /^(\d{2})(\d{5})(\d{0,4})$/,
            '($1) $2-$3'
        );
    }

    e.target.value = value;
});