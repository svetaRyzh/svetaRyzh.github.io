// Получаем все основные секции
const sections = document.querySelectorAll('.head, .between, .footer');
let currentSectionIndex = 0; // Индекс текущей секции
let isScrolling = false; // Флаг, чтобы не допустить параллельной прокрутки

// Функция для прокрутки к заданной секции
function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;

    isScrolling = true; 

    sections[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });

    setTimeout(() => {
        isScrolling = false;
        currentSectionIndex = index; 
    }, 1100);
}

window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    if (e.deltaY > 0) {
        scrollToSection(currentSectionIndex + 1);
    } else {
        scrollToSection(currentSectionIndex - 1);
    }
});

// Для мобильных устройств: отслеживание свайпов
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY; 
});

window.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY; // Конечная точка касания
    if (isScrolling) return; // Прерываем, если уже выполняется прокрутка

    if (touchStartY - touchEndY > 50) {
        // Свайп вверх (переход на следующую секцию)
        scrollToSection(currentSectionIndex + 1);
    } else if (touchEndY - touchStartY > 50) {
        // Свайп вниз (возврат к предыдущей секции)
        scrollToSection(currentSectionIndex - 1);
    }
});
