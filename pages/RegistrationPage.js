
const { expect } = require('@playwright/test');

class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.email = page.locator('#email');
        this.password = page.locator('#password');
        this.confirmPassword = page.locator('#confirmPassword');
        this.submitButton = page.getByRole('button', {
            name: 'Зарегистрироваться'
        });
        this.message = page.locator('#message');
    }

    async open() {
        await this.page.goto('file://' + process.cwd() + '/index.html');
    }

    async register(email, password, confirmPassword) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
        await this.submitButton.click();
    }
}

module.exports = RegistrationPage;
