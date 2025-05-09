document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    const tabIndicator = document.querySelector('.tab-indicator');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    const switchTabLinks = document.querySelectorAll('.switch-tab');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tab = this.getAttribute('data-tab');

            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const btnIndex = Array.from(tabBtns).indexOf(this);
            tabIndicator.style.transform = `translateX(${btnIndex * 100}%)`;

            authForms.forEach(form => form.classList.remove('active'));
            document.getElementById(`${tab}Form`).classList.add('active');

            if (tab === 'login') {
                document.querySelector('.auth-footer').innerHTML =
                    'Нет аккаунта? <a href="#" class="switch-tab" data-tab="register">Зарегистрироваться</a>';
            } else {
                document.querySelector('.auth-footer').innerHTML =
                    'Уже есть аккаунт? <a href="#" class="switch-tab" data-tab="login">Войти</a>';
            }

            document.querySelectorAll('.switch-tab').forEach(link => {
                link.addEventListener('click', switchTabHandler);
            });
        });
    });

    function switchTabHandler(e) {
        e.preventDefault();
        const tab = this.getAttribute('data-tab');
        document.querySelector(`.tab-btn[data-tab="${tab}"]`).click();
    }

    switchTabLinks.forEach(link => {
        link.addEventListener('click', switchTabHandler);
    });

    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const input = this.parentElement.querySelector('input');
            const isPassword = input.type === 'password';

            input.type = isPassword ? 'text' : 'password';
            this.classList.toggle('fa-eye-slash');
            this.classList.toggle('fa-eye');
        });
    });

    const registerPassword = document.getElementById('registerPassword');
    if (registerPassword) {
        registerPassword.addEventListener('input', function () {
            const strengthBars = document.querySelectorAll('.strength-bar');
            const strengthText = document.querySelector('.strength-text');
            const password = this.value;
            let strength = 0;

            if (password.length > 0) strength++;
            if (password.length >= 8) strength++;

            if (/\d/.test(password)) strength++;

            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;

            strengthBars.forEach((bar, index) => {
                bar.style.backgroundColor = index < strength ?
                    (strength < 2 ? '#ff4d4d' :
                        strength < 4 ? '#ffa500' : '#4CAF50') : '#eee';
            });

            strengthText.textContent =
                strength === 0 ? '' :
                    strength < 2 ? 'Слабый' :
                        strength < 4 ? 'Средний' : 'Сильный';
            strengthText.style.color =
                strength < 2 ? '#ff4d4d' :
                    strength < 4 ? '#ffa500' : '#4CAF50';
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirm').value;

            if (password !== confirmPassword) {
                alert('Пароли не совпадают!');
                return;
            }

            alert('Регистрация успешна!');
        });
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Вход выполнен!');
        });
    }
});