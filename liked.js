// Функция фильтрации галереи
function filterGallery() {
    const filterValue = document.getElementById("river-filter").value;
    const galleryItems = document.querySelectorAll(".gallery-item");
    const likedGalleryItems = document.querySelectorAll(".liked_gallery .gallery-item");

    // Фильтрация для основной галереи
    galleryItems.forEach(item => {
        if (filterValue === "all" || item.dataset.river === filterValue) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });

    // Фильтрация для избранных
    likedGalleryItems.forEach(item => {
        if (filterValue === "all" || item.dataset.river === filterValue) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}


// Функция для добавления или удаления фотографии в избранное
function toggleFavorite(button) {
    const galleryItem = button.closest('.gallery-item');
    const imageUrl = galleryItem.querySelector('img').src;
    const riverName = galleryItem.querySelector('.river-name').textContent;
    
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(fav => fav.imageUrl === imageUrl);

    if (isFavorite) {
        // Удаляем из избранного
        favorites = favorites.filter(fav => fav.imageUrl !== imageUrl);
        button.textContent = "В избранное";
        button.classList.remove("favorited");
    } else {
        // Добавляем в избранное
        favorites.push({ imageUrl, riverName });
        button.textContent = "Удалить из избранного";
        button.classList.add("favorited");
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites(); // Обновляем список избранных
}


// Функция отображения избранных фотографий
// Функция отображения избранных фотографий
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const likedPicturesContainer = document.querySelector('.liked_gallery');
    likedPicturesContainer.innerHTML = ''; // Очищаем контейнер перед обновлением

    if (favorites.length === 0) {
        likedPicturesContainer.innerHTML = '<p class="no_images">Здесь пока нет избранных фотографий.</p>';
        return;
    }

    favorites.forEach(fav => {
        // Создаем контейнер для каждой фотографии в избранном
        const galleryItem = document.createElement('div');
        galleryItem.classList.add('gallery-item');
        galleryItem.dataset.river = fav.riverName; // Присваиваем значение data-river
        
        const imgElement = document.createElement('img');
        imgElement.src = fav.imageUrl;
        imgElement.alt = "Избранная фотография";

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info');

        const h3 = document.createElement('h3');
        h3.textContent = fav.riverName; // Отображаем название реки

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('favorite-btn');
        deleteButton.textContent = "Удалить из избранного";

        // Добавляем обработчик для кнопки удаления
        deleteButton.addEventListener('click', () => {
            removeFromFavorites(fav.imageUrl);
        });

        // Добавляем элементы в div .info
        infoDiv.appendChild(h3);
        infoDiv.appendChild(deleteButton);

        // Добавляем картинку и информацию в контейнер
        galleryItem.appendChild(imgElement);
        galleryItem.appendChild(infoDiv);

        // Добавляем контейнер изображения в список избранных
        likedPicturesContainer.appendChild(galleryItem);
    });

    // Применяем фильтрацию после отображения избранных
    filterGallery();
}


// Обновление кнопок в галерее
function updateGalleryButtons() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const imageUrl = item.querySelector('img').src;
        const button = item.querySelector('button.favorite-btn');

        const isFavorite = favorites.some(fav => fav.imageUrl === imageUrl);

        if (isFavorite) {
            button.textContent = "Удалить из избранного";
            button.classList.add("favorited");
        } else {
            button.textContent = "В избранное";
            button.classList.remove("favorited");
        }
    });
}

function removeFromFavorites(imageUrl) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.imageUrl !== imageUrl); // Убираем изображение из массива
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites(); // Перерисовываем избранные фотографии
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', displayFavorites);

// Инициализация
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const imageUrl = item.querySelector('img').src;
        const riverName = item.querySelector('.river-name').textContent;
        const button = item.querySelector('button.favorite-btn');

        // Проверяем состояние избранного и обновляем кнопки
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavorite = favorites.some(fav => fav.imageUrl === imageUrl);

        if (isFavorite) {
            button.textContent = "Удалить из избранного";
            button.classList.add("favorited");
        } else {
            button.textContent = "В избранное";
            button.classList.remove("favorited");
        }

        // Обработчик клика для кнопки
        button.addEventListener('click', () => toggleFavorite(button));
    });

    // Показываем избранные картинки
    displayFavorites();
});

document.addEventListener('DOMContentLoaded', () => {
    // Показываем избранные фотографии
    displayFavorites();

    // Обработчик фильтрации
    const filterSelect = document.getElementById("river-filter");
    filterSelect.addEventListener('change', filterGallery);
});

