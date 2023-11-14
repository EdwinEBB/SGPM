document.addEventListener("DOMContentLoaded", function () {
    // ... (código existente)

    // Escuchar el evento de cambio de modo oscuro desde la página de configuración
    window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'darkModeChanged') {
            applyDarkMode(event.data.value);
        }
    });

    // Escuchar el evento de cambio de tamaño de fuente desde la página de configuración
    window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'fontSizeChanged') {
            applyFontSize(event.data.value);
        }
    });

    // Escuchar el evento de cambio de color del tema desde la página de configuración
    window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'themeColorChanged') {
            applyThemeColor(event.data.value);
        }
    });

    // Escuchar el evento de cambio de notificaciones desde la página de configuración
    window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'notificationsChanged') {
            applyNotifications(event.data.value);
        }
    });

    // Escuchar el evento de cambio de espaciado desde la página de configuración
    window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'spacingChanged') {
            applySpacing(event.data.value);
        }
    });

    // Escuchar el evento de cambio de estilo del cursor desde la página de configuración
    window.addEventListener('message', function (event) {
        if (event.data && event.data.type === 'cursorStyleChanged') {
            applyCursorStyle(event.data.value);
        }
    });

    // Función para aplicar el modo oscuro
    function applyDarkMode(isDarkMode) {
        document.body.classList.toggle("dark-mode", isDarkMode);
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
    function applyNotifications(isChecked) {
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

    // ... (otras funciones y lógica)
});
