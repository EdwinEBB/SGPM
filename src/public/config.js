document.addEventListener("DOMContentLoaded", function () {
    const darkModeCheckbox = document.getElementById("darkModeCheckbox");
    const fontSizeSmall = document.getElementById("fontSizeSmall");
    const fontSizeMedium = document.getElementById("fontSizeMedium");
    const fontSizeLarge = document.getElementById("fontSizeLarge");
    const themeColorBlue = document.getElementById("themeColorBlue");
    const themeColorGreen = document.getElementById("themeColorGreen");
    const themeColorOrange = document.getElementById("themeColorOrange");
    const notificationCheckbox = document.getElementById("notificationCheckbox");
    const spacingCompact = document.getElementById("spacingCompact");
    const spacingNormal = document.getElementById("spacingNormal");
    const spacingWide = document.getElementById("spacingWide");
    const cursorStyleDefault = document.getElementById("cursorStyleDefault");
    const cursorStyleUnderline = document.getElementById("cursorStyleUnderline");
    const cursorStyleExpanded = document.getElementById("cursorStyleExpanded");

    // Cargar configuraciones guardadas
    loadSettings();

    // Evento de cambio para el modo oscuro
    darkModeCheckbox.addEventListener("change", function () {
        applyDarkMode();
        saveSettings();

        // Emitir un evento para notificar el cambio a otras páginas
        window.postMessage({ type: 'darkModeChanged', value: darkModeCheckbox.checked }, '*');
    });

    // Evento de cambio para el tamaño de fuente
    [fontSizeSmall, fontSizeMedium, fontSizeLarge].forEach(function (el) {
        el.addEventListener("change", function () {
            applyFontSize(el.value);
            saveSettings();

            // Emitir un evento para notificar el cambio a otras páginas
            window.postMessage({ type: 'fontSizeChanged', value: el.value }, '*');
        });
    });

    // Evento de cambio para el color del tema
    [themeColorBlue, themeColorGreen, themeColorOrange].forEach(function (el) {
        el.addEventListener("change", function () {
            applyThemeColor(el.value);
            saveSettings();

            // Emitir un evento para notificar el cambio a otras páginas
            window.postMessage({ type: 'themeColorChanged', value: el.value }, '*');
        });
    });

    // Evento de cambio para las notificaciones
    notificationCheckbox.addEventListener("change", function () {
        applyNotifications();
        saveSettings();

        // Emitir un evento para notificar el cambio a otras páginas
        window.postMessage({ type: 'notificationsChanged', value: notificationCheckbox.checked }, '*');
    });

    // Evento de cambio para el espaciado
    [spacingCompact, spacingNormal, spacingWide].forEach(function (el) {
        el.addEventListener("change", function () {
            applySpacing(el.value);
            saveSettings();

            // Emitir un evento para notificar el cambio a otras páginas
            window.postMessage({ type: 'spacingChanged', value: el.value }, '*');
        });
    });

    // Evento de cambio para el estilo del cursor
    [cursorStyleDefault, cursorStyleUnderline, cursorStyleExpanded].forEach(function (el) {
        el.addEventListener("change", function () {
            applyCursorStyle(el.value);
            saveSettings();

            // Emitir un evento para notificar el cambio a otras páginas
            window.postMessage({ type: 'cursorStyleChanged', value: el.value }, '*');
        });
    });

    // Función para cargar configuraciones guardadas
    function loadSettings() {
        // Cargar desde almacenamiento local
        const savedSettings = JSON.parse(localStorage.getItem("appSettings")) || {};

        darkModeCheckbox.checked = savedSettings.darkMode || false;
        applyDarkMode();

        // Cargar tamaño de fuente
        if (savedSettings.fontSize) {
            applyFontSize(savedSettings.fontSize);
            // Marcar el radio button correspondiente
            document.querySelector(`#fontSize${savedSettings.fontSize.charAt(0).toUpperCase() + savedSettings.fontSize.slice(1)}`).checked = true;
        }

        // Cargar color del tema
        if (savedSettings.themeColor) {
            applyThemeColor(savedSettings.themeColor);
            // Marcar el radio button correspondiente
            document.querySelector(`#themeColor${savedSettings.themeColor.charAt(0).toUpperCase() + savedSettings.themeColor.slice(1)}`).checked = true;
        }

        notificationCheckbox.checked = savedSettings.notifications || false;
        applyNotifications();

        // Cargar espaciado
        if (savedSettings.spacing) {
            applySpacing(savedSettings.spacing);
            // Marcar el radio button correspondiente
            document.querySelector(`#spacing${savedSettings.spacing.charAt(0).toUpperCase() + savedSettings.spacing.slice(1)}`).checked = true;
        }

        // Cargar estilo del cursor
        if (savedSettings.cursorStyle) {
            applyCursorStyle(savedSettings.cursorStyle);
            // Marcar el radio button correspondiente
            document.querySelector(`#cursorStyle${savedSettings.cursorStyle.charAt(0).toUpperCase() + savedSettings.cursorStyle.slice(1)}`).checked = true;
        }
    }

    // Función para aplicar el modo oscuro
    function applyDarkMode() {
        document.body.classList.toggle("dark-mode", darkModeCheckbox.checked);
        // Aplicar el modo oscuro en otras páginas si es necesario
        applyDarkModeToOtherPages(darkModeCheckbox.checked);
    }

    // Función para aplicar el tamaño de fuente
    function applyFontSize(size) {
        document.body.classList.remove("font-size-small", "font-size-medium", "font-size-large");
        document.body.classList.add(`font-size-${size}`);
    }

    // Función para aplicar el color del tema
    function applyThemeColor(color) {
        document.body.classList.remove("theme-color-blue", "theme-color-green", "theme-color-orange");
        document.body.classList.add(`theme-color-${color}`);
    }

    // Función para aplicar las notificaciones
    function applyNotifications() {
        // Agrega aquí la lógica para aplicar las notificaciones (si es necesario)
    }

    // Función para aplicar el espaciado
    function applySpacing(spacing) {
        document.body.classList.remove("spacing-compact", "spacing-normal", "spacing-wide");
        document.body.classList.add(`spacing-${spacing}`);
    }

    // Función para aplicar el estilo del cursor
    function applyCursorStyle(style) {
        document.body.classList.remove("cursor-style-default", "cursor-style-underline", "cursor-style-expanded");
        document.body.classList.add(`cursor-style-${style}`);
    }

    // Función para aplicar el modo oscuro en otras páginas
    function applyDarkModeToOtherPages(isDarkMode) {
        // Emplear la comunicación entre ventanas para notificar a otras páginas del cambio
        localStorage.setItem("darkModeSetting", JSON.stringify({ darkMode: isDarkMode }));
    }

    // Función para guardar configuraciones
    function saveSettings() {
        const settings = {
            darkMode: darkModeCheckbox.checked,
            fontSize: getSelectedRadioValue("fontSize"),
            themeColor: getSelectedRadioValue("themeColor"),
            notifications: notificationCheckbox.checked,
            spacing: getSelectedRadioValue("spacing"),
            cursorStyle: getSelectedRadioValue("cursorStyle"),
        };

        // Guardar en almacenamiento local
        localStorage.setItem("appSettings", JSON.stringify(settings));
    }

    // Función para obtener el valor seleccionado de un grupo de radio buttons
    function getSelectedRadioValue(name) {
        const radios = document.querySelectorAll(`input[name="${name}"]:checked`);
        return radios.length > 0 ? radios[0].value : null;
    }
});
