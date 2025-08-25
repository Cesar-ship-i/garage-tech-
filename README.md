# 🚗 GarageOnline - Ecommerce de Vehículos

![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-7952B3?style=for-the-badge&logo=bootstrap)![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5)![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3)

Un sofisticado y altamente interactivo sitio web de ecommerce para la venta de vehículos, construido desde cero con tecnologías web modernas y enfocado en una experiencia de usuario excepcional (UI/UX), accesibilidad (A11y) y un diseño completamente adaptativo.

---

## ✨ Características Principales

Este proyecto no es solo una página estática; es una aplicación web de una sola página (SPA) simulada que incluye:

*   **📊 Carga Dinámica de Datos:** Los vehículos se cargan de forma asíncrona desde un archivo JSON externo usando la API `Fetch` y `async/await`.
*   **🖼️ Galería de Productos Interactiva:** Una interfaz limpia y moderna para explorar el catálogo de vehículos, con efectos `hover` y diseño optimizado.
*   **🔍 Búsqueda y Filtrado en Tiempo Real:** Un buscador que filtra los vehículos por marca, modelo o categoría al instante, sin recargar la página.
*   **🛒 Carrito de Compras Completo:**
    *   Añadir productos con selección de cantidad a través de un modal interactivo.
    *   Contador de ítems en el header que se actualiza en tiempo real con una sutil animación.
    *   Modal del carrito para visualizar, revisar y gestionar la compra.
*   **💳 Simulación de Proceso de Pago:** Un flujo de pago simulado a través de modales que guía al usuario desde la selección del producto hasta la finalización de la compra.
*   **📄 Generación de Facturas en PDF:** Al procesar el pago, se genera y descarga automáticamente una factura en formato PDF con los detalles de la compra, utilizando la librería `jsPDF`.
*   **📱 Diseño 100% Adaptativo (Responsive):** Perfecta visualización en cualquier dispositivo (móviles, tabletas y escritorio) gracias a Bootstrap 5.
*   **♿ Accesibilidad (WCAG AA):** Implementación de HTML semántico y atributos ARIA para garantizar que la web sea usable por personas con discapacidades, incluyendo lectores de pantalla.
*   **🚀 Optimización de Rendimiento:** Uso de `loading="lazy"` para imágenes y carga asíncrona de scripts para una velocidad de carga óptima.

---

## 🛠️ Herramientas y Tecnologías

Este proyecto fue construido utilizando únicamente tecnologías frontend puras, sin necesidad de frameworks complejos ni dependencias de backend.

| Tecnología | Descripción |
| :--- | :--- |
| **HTML5** | Estructura semántica (`<header>`, `<main>`, `<section>`) y accesible. |
| **CSS3** | Estilos personalizados, Flexbox para layout, animaciones y transiciones suaves. |
| **JavaScript (ES6+)** | Lógica de la aplicación, manipulación del DOM, gestión de eventos, `async/await` para peticiones. |
| **Bootstrap 5.3** | Framework CSS para un diseño responsive, componentes UI (modales, navbar, grid) y estilos base. |
| **Font Awesome 6.5** | Librería de iconografía para mejorar la interfaz visual. |
| **jsPDF** | Librería del lado del cliente para generar documentos PDF de forma dinámica. |

---

## 🚀 Cómo Empezar

No necesitas un entorno de desarrollo complejo ni un servidor web para ejecutar este proyecto. Solo sigue estos sencillos pasos:

### Prerrequisitos

*   Un navegador web moderno (Chrome, Firefox, Safari, Edge).
*   Un editor de código (como VS Code) si deseas modificar el código.

### Instalación

1.  **Clona el repositorio (o simplemente descarga los archivos):**
    ```bash
    git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
    ```
2.  **Navega al directorio del proyecto:**
    ```bash
    cd TU_REPOSITORIO
    ```
3.  **Abre el archivo `index.html`:**
    Simplemente haz doble clic en el archivo `index.html` en tu explorador de archivos, o arrástralo a la ventana de tu navegador.

¡Y eso es todo! La página web se cargará y será completamente funcional.

---

## 📂 Estructura de Archivos

El proyecto está organizado en tres archivos principales, manteniendo una clara separación de responsabilidades:

.
├── 📄 index.html # Estructura y contenido de la página
├── 🎨 style.css # Estilos visuales y diseño
└── 💻 script.js # Lógica interactiva y funcional

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Esto significa que eres libre de usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del software. El único requisito es que el aviso de copyright y esta licencia se incluyan en todas las copias o porciones sustanciales del software.

Para más detalles, consulta el texto completo de la licencia: [MIT License](https://opensource.org/licenses/MIT).
