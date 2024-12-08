const captchaContainer = document.getElementById('captcha');
const captchaInput = document.getElementById('captcha-input');
const errorMessage = document.getElementById('error-message');
const captchaContainerElement = document.querySelector('.captcha_container_all');

function generateRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function generateLetterCaptcha() {
    let captcha = '';
    for (let i = 0; i < 5; i++) {
        captcha += generateRandomLetter();
    }
    captchaContainer.textContent = captcha;
    captchaInput.value = '';
    captchaInput.focus();
    errorMessage.textContent = '';
}

function checkCaptcha() {
    const inputValue = captchaInput.value.trim();
    const captchaText = captchaContainer.textContent;

    // Проверка, что код капчи совпадает
    if (inputValue.toLowerCase() === captchaText.toLowerCase()) {
        showRegistration(); // Показываем форму регистрации
        captchaContainerElement.style.display = 'none'; // Скрываем капчу
    } else {
        errorMessage.textContent = 'Неверный код';
    }
}

// Слушаем ввод в поле капчи и автоматически проверяем
captchaInput.addEventListener('input', checkCaptcha);

function showCaptcha() {
    document.querySelector('.overlay').style.display = 'block';
    generateLetterCaptcha();
    captchaContainerElement.style.display = 'block'; // Показываем панель капчи
}

function showRegistration() {
    document.querySelector('.registration').style.display = 'block'; // Показываем панель регистрации
    document.querySelector('.overlay').style.display = 'block'; // Показываем overlay
}

function hideCaptcha() {
    captchaContainerElement.style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
}
