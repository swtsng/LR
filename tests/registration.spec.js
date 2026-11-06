const { test, expect } = require('@playwright/test');
const RegistrationPage = require('../pages/RegistrationPage');

test('Успешная регистрация', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.open();

    await registration.register('test@mail.ru', 'Password123', 'Password123');

    await expect(registration.message).toHaveText('Регистрация успешна!');
});

test('Регистрация с пустым email', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.open();

    await registration.register('', 'Password123', 'Password123');

    await expect(registration.message).toHaveText('Заполните все поля');
});

test('Email без символа @', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.open();

    await registration.email.fill('testmail.ru');

    await expect(registration.email).toHaveJSProperty(
        'validity.typeMismatch', true
    );
});

test('Пароль короче минимального', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.open();

    await registration.register('short@mail.ru', '1234567', '1234567');

    await expect(registration.message).toHaveText(
        'Пароль должен содержать 8-20 символов'
    );
});

test('Пароли не совпадают', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.open();

    await registration.register('mismatch@mail.ru', 'Password123', 'Password321');

    await expect(registration.message).toHaveText('Пароли не совпадают');
});

test('Повторная регистрация', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.open();

    await registration.register('duplicate@mail.ru', 'Password123', 'Password123');
    await registration.register('duplicate@mail.ru', 'Password123', 'Password123');

    await expect(registration.message).toHaveText('Пользователь уже существует');
});

test('Проверка SQL-инъекции и XSS', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.open();

    await registration.email.fill("' OR 1=1 --");

    await expect(registration.email).toHaveJSProperty(
        'validity.typeMismatch', true
    );
});

test('Пароль минимальной длины 8 символов', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.open();

    await registration.register('min@mail.ru', '12345678', '12345678');

    await expect(registration.message).toHaveText('Регистрация успешна!');
});

test('Пароль максимальной длины 20 символов', async ({ page }) => {
    const registration = new RegistrationPage(page);
    await registration.open();

    await registration.register('max@mail.ru', '12345678901234567890', '12345678901234567890');

    await expect(registration.message).toHaveText('Регистрация успешна!');
});