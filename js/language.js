let currentLanguage = 'en';
let translations = {};

// Load translations
async function loadTranslations(lang) {
    try {
        const response = await fetch(`translations/${lang}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations[lang] = await response.json();
    } catch (error) {
        console.error(`Error loading ${lang} translations:`, error);
    }
}

// Initialize language system
async function initLanguage() {
    try {
        // Load all translations
        await Promise.all([
            loadTranslations('en'),
            loadTranslations('ro'),
            loadTranslations('nl')
        ]);

        // Set initial language from localStorage or default to English
        const savedLanguage = localStorage.getItem('language') || 'en';
        setLanguage(savedLanguage);
    } catch (error) {
        console.error('Error initializing language system:', error);
    }
}

// Update the language selector UI
function updateLanguageSelector() {
    const languageSelector = document.querySelector('.language-selector');
    const currentFlag = languageSelector.querySelector('.current-flag');
    const flagImg = currentFlag.querySelector('img');
    
    // Update current flag
    flagImg.src = `assets/flags/${currentLanguage}.svg`;
    flagImg.alt = currentLanguage.toUpperCase();
}

// Set the website language
function setLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Translations for ${lang} not found`);
        return;
    }

    currentLanguage = lang;
    localStorage.setItem('language', lang);

    // Update all translatable elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[lang];
        
        for (const k of keys) {
            if (!value || typeof value !== 'object') {
                value = null;
                break;
            }
            value = value[k];
        }
        
        if (value) {
            if (element.tagName === 'INPUT' && element.type === 'placeholder') {
                element.placeholder = value;
            } else {
                element.textContent = value;
            }
        }
    });

    // Update language selector UI
    updateLanguageSelector();

    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Initialize language system when DOM is loaded
document.addEventListener('DOMContentLoaded', initLanguage); 