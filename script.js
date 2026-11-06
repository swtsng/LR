
const form = document.getElementById('registerForm');
const message = document.getElementById('message');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!email || !password || !confirmPassword) {
        message.textContent = 'Заполните все поля';
        return;
    }

    if (password.length < 8 || password.length > 20) {
        message.textContent = 'Пароль должен содержать 8-20 символов';
        return;
    }

    if (password !== confirmPassword) {
        message.textContent = 'Пароли не совпадают';
        return;
    }

    if (localStorage.getItem(email)) {
        message.textContent = 'Пользователь уже существует';
        return;
    }

    localStorage.setItem(email, password);
    message.textContent = 'Регистрация успешна!';
});
