"use strict"
const imageUrls = [
    "images/Nonagon Infinity.jpg",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300",
    "https://via.placeholder.com/300"
];

// Получаем тело документа
const body = document.querySelector('body');

// Добавляем изображения в DOM
imageUrls.forEach(url => {
    const img = document.createElement('img');
    img.src = url;
    img.alt = "Dynamic Image";
    body.appendChild(img);
});