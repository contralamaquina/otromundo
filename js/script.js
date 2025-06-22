// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Overlay de bienvenida
    const overlay = document.getElementById('welcome-overlay');
    const enterButton = document.getElementById('enter-button');

    if (enterButton && overlay) {
        enterButton.addEventListener('click', () => {
            overlay.classList.add('hide');
            overlay.addEventListener('transitionend', () => {
                overlay.style.display = 'none';
            }, { once: true });
        });
    }

    // Ejemplo: Mostrar un mensaje al hacer clic en el título
    const title = document.querySelector('header h1');
    if (title) {
        title.addEventListener('click', () => {
            alert('¡Bienvenido a tu proyecto web!');
        });
    }

    // -------- Carrusel y controles flotantes --------
    // Rutas de imágenes para el carrusel (puedes agregar más)
    const carouselImages = [
        'img/ejemplo.jpg',
        'img/ejemplo2.jpg',
        'img/ejemplo3.jpg'
    ];
    let currentIndex = 0;
    let magicActive = false;

    const carouselImg = document.getElementById('carousel-image');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const magicBtn = document.getElementById('magic-effect-btn');

    function showImage(index) {
        if (!carouselImg) return;
        carouselImg.src = carouselImages[index];
        // Si el filtro mágico estaba activo, asegúrate de que se aplique a la nueva imagen
        if (magicActive) {
            carouselImg.classList.add('magic-effect');
        } else {
            carouselImg.classList.remove('magic-effect');
        }
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
            showImage(currentIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % carouselImages.length;
            showImage(currentIndex);
        });
    }

    if (magicBtn) {
        magicBtn.addEventListener('click', () => {
            magicActive = !magicActive;
            if (magicActive) {
                carouselImg.classList.add('magic-effect');
            } else {
                carouselImg.classList.remove('magic-effect');
            }
        });
    }

    // Inicializar la imagen del carrusel
    showImage(currentIndex);
});