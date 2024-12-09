// Функция для отправки формы
function submitForm(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Проверка капчи
    const captchaInput = document.getElementById("captcha-input").value;
    const captchaCode = document.getElementById("captcha").textContent;
    if (captchaInput !== captchaCode) {
        document.getElementById("error-message").innerText = "Неправильный код капчи!";
        return;
    }

    // Считываем введенные пользователем данные
    const username = document.getElementById("username").value;
    const age = document.getElementById("age").value;
    const photoInput = document.getElementById("photo");
    const password = document.getElementById("password").value;

    let photo = null;
    if (photoInput.files.length > 0) {
        // Конвертируем изображение в base64
        convertImageToBase64(photoInput.files[0], function (base64Image) {
            photo = base64Image;

            const user = {
                username,
                age,
                photo,
                password,
            };

            // Сохраняем данные в localStorage
            localStorage.setItem("user", JSON.stringify(user));

            // Перенаправляем на страницу пользователя
            window.location.href = "user.html";
        });
    } else {
        const user = {
            username,
            age,
            photo,
            password,
        };

        // Сохраняем данные в localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // Перенаправляем на страницу пользователя
        window.location.href = "user.html";
    }
}

// Функция для конвертации изображения в base64
function convertImageToBase64(file, callback) {
    const reader = new FileReader();
    reader.onloadend = function () {
        callback(reader.result); // Возвращаем base64 строку
    };
    reader.readAsDataURL(file);
}

// Функция для загрузки данных пользователя
function loadUserData() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("Данные пользователя не найдены. Вернитесь на главную страницу.");
        window.location.href = "index.html";
        return;
    }

    // Отображение имени пользователя
    document.getElementById("user-name").textContent = user.username;

    // Отображение возраста
    document.getElementById("user-age").textContent = user.age;

    // Отображение email
    document.getElementById("user-email").textContent = user.email;

    // Отображение информации о себе
    document.getElementById("user-about").textContent = user.about;

    // Отображение даты рождения
    document.getElementById("user-birthdate").textContent = user.birthdate;

    // Отображение фото, если оно загружено
    const userPhoto = document.getElementById("user-photo");
    if (user.photo) {
        userPhoto.src = user.photo;
        userPhoto.style.display = "block";
    } else {
        userPhoto.src = "https://i.pinimg.com/736x/6f/69/79/6f69794f67caf74c5a59db5043560bb8.jpg"; // Замените "default.jpg" на путь к вашему изображению по умолчанию
        userPhoto.style.display = "block";
    }
}

if (window.location.pathname.includes("user.html")) {
    document.addEventListener("DOMContentLoaded", loadUserData);
}
function displayUserOnMainPage() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        const loginButton = document.querySelector(".prompt"); // Селектор кнопки входа
        if (loginButton) {
            loginButton.style.display = "none"; // Скрываем кнопку входа
        }

        const userInfoBlock = document.getElementById("user-info"); // ID блока информации о пользователе
        if (userInfoBlock) {
            const userPhoto = document.getElementById("user-photo"); // ID элемента для фото
            const userName = document.getElementById("user-name"); // ID элемента для имени

            if (user.photo && userPhoto) {
                userPhoto.src = user.photo;
                userPhoto.alt = "Фото пользователя";
                userPhoto.style.display = "block"; // Отображаем фото
            } else if (userPhoto) {
                userPhoto.src = "https://i.pinimg.com/736x/6f/69/79/6f69794f67caf74c5a59db5043560bb8.jpg"; // Изображение по умолчанию
                userPhoto.style.display = "block"; // Отображаем фото по умолчанию
            }

            if (user.username && userName) {
                userName.textContent = `Привет, ${user.username}!`; // Используем шаблонные строки
            }

            userInfoBlock.style.display = "block"; // Отображаем блок информации
        }
    }
}


if (window.location.pathname.includes("user.html")) {
    document.addEventListener("DOMContentLoaded", loadUserData);
} else if (window.location.pathname.includes("index.html")) {
    document.addEventListener("DOMContentLoaded", displayUserOnMainPage);
}


function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    // Через 3 секунды скрыть уведомление
    setTimeout(function() {
        notification.classList.remove("show");
    }, 3000);
}

// Функция для обновления данных пользователя
function updateUserName() {
    // Получаем новое имя пользователя из span с contenteditable
    const newUserName = document.getElementById("user-name").textContent;

    // Получаем другие данные из страницы
    const newAge = document.getElementById("user-age").textContent;
    const newEmail = document.getElementById("user-email").textContent;
    const newAbout = document.getElementById("user-about").textContent;
    const newBirthdate = document.getElementById("user-birthdate").textContent;
    const newPhotoInput = document.getElementById("new-photo");

    // Получаем текущие данные пользователя из localStorage
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        // Обновляем данные пользователя
        user.username = newUserName;
        user.age = newAge;
        user.email = newEmail;
        user.about = newAbout;
        user.birthdate = newBirthdate;

        // Обрабатываем загрузку нового фото, если оно было выбрано
        if (newPhotoInput.files && newPhotoInput.files[0]) {
            convertImageToBase64(newPhotoInput.files[0], function(base64Image) {
                user.photo = base64Image;
                // Сохраняем обновленные данные в localStorage
                localStorage.setItem("user", JSON.stringify(user));
                // Обновляем фото на странице
                document.getElementById("user-photo").src = base64Image;

                // Показываем уведомление
                showNotification("Изменения успешно сохранены!");
            });
        } else {
            // Если фото не менялось, просто сохраняем данные без изменений
            localStorage.setItem("user", JSON.stringify(user));

            // Показываем уведомление
            showNotification("Изменения успешно сохранены!");
        }

        // Обновляем имя на странице
        document.getElementById("user-name").textContent = newUserName;

        // Обновляем приветствие на главной странице, если на главной странице
        if (window.location.pathname.includes("index.html")) {
            displayUserOnMainPage();
        }
    }
}

// Запускаем только на главной странице
if (window.location.pathname.includes("index.html")) {
    document.addEventListener("DOMContentLoaded", displayUserOnMainPage);
}
