const translations = {
    en: {
        title: "Calculator",
        theme: "Black theme"
    },
    ru: {
        title: "Калькулятор",
        theme: "Темная тема"
    }
};

function getUserLanguage() {
    const lang = navigator.language.slice(0, 2); // Например, "ru"
    return translations[lang] ? lang : "en"; // Если нет перевода, используем английский
}

function applyTranslations() {
    const lang = getUserLanguage();
    
    document.querySelector("title").textContent = translations[lang].title;
    document.querySelector("#theme-text").textContent = translations[lang].theme;
}

// Запускаем перевод при загрузке страницы
document.addEventListener("DOMContentLoaded", applyTranslations);