// Функция фильтрации галереи
function filterGallery() {
    const filterValue = document.getElementById("river-filter").value;
    const filterItems = (items) => {
        items.forEach(item => {
            if (filterValue === "all" || item.dataset.river === filterValue) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    };
    // Фильтрация основной галереи и избранного
    filterItems(document.querySelectorAll(".gallery-item"));
    filterItems(document.querySelectorAll(".liked_gallery .gallery-item"));
}

// Функция для добавления или удаления фотографии в избранное
function toggleFavorite(button) {
    const galleryItem = button.closest('.gallery-item');
    const imageUrl = galleryItem.querySelector('img').src;
    const riverName = galleryItem.querySelector('.river-name').textContent;

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isFavorite = favorites.some(fav => fav.imageUrl === imageUrl);

    if (isFavorite) {
        favorites = favorites.filter(fav => fav.imageUrl !== imageUrl);
        button.textContent = "В избранное";
        button.classList.remove("favorited");
    } else {
        favorites.push({ imageUrl, riverName });
        button.textContent = "Удалить из избранного";
        button.classList.add("favorited");
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

// Функция отображения избранных фотографий
function displayFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const likedPicturesContainer = document.querySelector('.liked_gallery');
    likedPicturesContainer.innerHTML = ''; // Очищаем контейнер перед обновлением

    if (favorites.length === 0) {
        likedPicturesContainer.innerHTML = '<p class="no_images">Здесь пока нет избранных фотографий.</p>';
    } else {
        favorites.forEach(fav => {
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.dataset.river = fav.riverName;

            const imgElement = document.createElement('img');
            imgElement.src = fav.imageUrl;
            imgElement.alt = "Избранная фотография";

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('info');

            const h3 = document.createElement('h3');
            h3.textContent = fav.riverName;

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('favorite-btn');
            deleteButton.textContent = "Удалить из избранного";
            deleteButton.addEventListener('click', () => removeFromFavorites(fav.imageUrl));

            infoDiv.appendChild(h3);
            infoDiv.appendChild(deleteButton);

            galleryItem.appendChild(imgElement);
            galleryItem.appendChild(infoDiv);

            likedPicturesContainer.appendChild(galleryItem);
        });
    }

    filterGallery();
}

// Удаление из избранного
function removeFromFavorites(imageUrl) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(fav => fav.imageUrl !== imageUrl);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    displayFavorites();
}

// Обновление кнопок галереи
function updateGalleryButtons() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    document.querySelectorAll('.gallery-item').forEach(item => {
        const imageUrl = item.querySelector('img').src;
        const button = item.querySelector('button.favorite-btn');

        if (favorites.some(fav => fav.imageUrl === imageUrl)) {
            button.textContent = "Удалить из избранного";
            button.classList.add("favorited");
        } else {
            button.textContent = "В избранное";
            button.classList.remove("favorited");
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryItems.forEach(item => {
        const button = item.querySelector('button.favorite-btn');
        button.addEventListener('click', () => toggleFavorite(button));
    });

    // Обработчик фильтрации
    const filterSelect = document.getElementById("river-filter");
    filterSelect.addEventListener('change', filterGallery);

    displayFavorites();
    updateGalleryButtons();
});
