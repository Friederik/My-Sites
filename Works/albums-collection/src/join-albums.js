// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Массив с путями к изображениям (можно загрузить с сервера или с другого источника)
    const imagePaths = [
        'src/covers/Gorillaz.jpg',
        'src/covers/Grin.jpg',
        'src/covers/Hold Your Colour.jpg',
        'src/covers/Leviathan.jpg',
        'src/covers/Nonagon Infinity.jpg',
        'src/covers/Roots.jpg',
        'src/covers/Rust In Peace.jpg',
        'src/covers/Significant Other.jpg',
        'src/covers/Slipknot.jpg',
        'src/covers/System of a Down.jpg',
        'src/covers/The Fat of the Land.jpg',
        'src/covers/This Does Not Exist.jpg',
        'src/covers/Vulgar Display of Power.jpg',
        'src/covers/Wlfgrl.jpg',
        'src/covers/Река Крови.jpg',
        'src/covers/Сто лет одиночества.jpg',
        'src/covers/Театръ Демона.jpg',
        'src/covers/Цвет времени.jpg',
        // Добавьте сюда больше путей к картинкам
    ];

    const imageGrid = document.getElementById('imageGrid');

    // Для каждого пути изображения создаем элемент img и добавляем его в сетку
    imagePaths.forEach(path => {
        const imgElement = document.createElement('img');
        const anchor = document.createElement('a');
        anchor.href = 'src/album-pages/album-page.html'
        imgElement.src = path;
        imgElement.alt = 'Image';

        anchor.appendChild(imgElement);
        imageGrid.appendChild(anchor);
    });
});
