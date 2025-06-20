// script.js

// Función para obtener un elemento aleatorio de un array
function getRandomElement(arr) {
    if (!arr || arr.length === 0) {
        return '';
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

// Función principal para mostrar el resultado del quiz
function mostrarResultado() {
    const signo = document.getElementById('signo').value;
    const aspecto = document.getElementById('aspecto').value;
    const elemento = document.getElementById('elemento').value;
    const nivel = document.getElementById('nivel').value;

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxContentQuiz = document.getElementById('lightbox-content-quiz');

    // Ocultar la imagen del carrusel y el contenido del quiz al inicio de la función
    lightboxImg.style.display = 'none';
    lightboxContentQuiz.style.display = 'none'; // Asegurarse de que esté oculto

    // VALIDACIÓN: No mostrar resultados hasta que todas las preguntas estén respondidas
    if (signo === "" || aspecto === "" || elemento === "" || nivel === "") {
        lightboxContentQuiz.innerHTML = `
            <div class="lightbox-quiz-result" style="padding: 20px;">
                <h3 style="color: #FF5733;">¡Atención!</h3>
                <p>Por favor, selecciona una opción para cada pregunta para descubrir tu suculenta ideal.</p>
                <img src="fotos/placeholder_error.png" alt="Error de selección" style="max-width: 150px; margin-top: 15px; border: none;">
            </div>
        `;
        lightboxContentQuiz.style.display = 'block'; // Mostrar el div de contenido del quiz
        lightbox.style.display = 'flex'; // Mostrar el lightbox
        return; // Detiene la ejecución si faltan respuestas
    }

    let plantasCandidatas = [];
    let maxScore = -1;

    // Verificar si plantasCompletas está definida y es un array
    if (typeof plantasCompletas === 'undefined' || !Array.isArray(plantasCompletas) || plantasCompletas.length === 0) {
        lightboxContentQuiz.innerHTML = `
            <div class="lightbox-quiz-result" style="padding: 20px;">
                <h3 style="color: red;">Error en los datos</h3>
                <p>No se ha cargado la información de las plantas. Asegúrate de que "plantascompletas.js" esté correctamente enlazado y contenga el array "plantasCompletas".</p>
                <img src="fotos/placeholder_error.png" alt="Error de carga" style="max-width: 150px; margin-top: 15px; border: none;">
            </div>
        `;
        lightboxContentQuiz.style.display = 'block';
        lightbox.style.display = 'flex';
        return;
    }

    // Calcular la puntuación para cada planta
    plantasCompletas.forEach(planta => {
        let currentScore = 0;

        // Puntuación por coincidencias (mayor prioridad = más puntos)
        if (signo && planta.signos && planta.signos.map(s => s.toLowerCase()).includes(signo.toLowerCase())) {
            currentScore += 4; // Mayor prioridad
        }
        if (aspecto && planta.vida && planta.vida.map(v => v.toLowerCase()).includes(aspecto.toLowerCase())) {
            currentScore += 3; // Media-alta prioridad
        }
        if (elemento && planta.elementos && planta.elementos.map(e => e.toLowerCase()).includes(elemento.toLowerCase())) {
            currentScore += 2; // Media prioridad
        }
        if (nivel && planta.niveles && planta.niveles.map(n => n.toLowerCase()).includes(nivel.toLowerCase())) {
            currentScore += 1; // Menor prioridad
        }

        // Actualizar la lista de plantas candidatas
        if (currentScore > maxScore) {
            maxScore = currentScore;
            plantasCandidatas = [planta]; // Nueva planta con la puntuación más alta
        } else if (currentScore === maxScore && maxScore > -1) {
            plantasCandidatas.push(planta); // Añadir plantas con la misma puntuación máxima
        }
    });

    let suculentaIdeal;

    // Si no se encontró ninguna coincidencia (todos los scores son 0), o si el usuario no seleccionó nada (maxScore sigue en -1),
    // o si el quiz no arrojó resultados válidos, selecciona una planta aleatoria.
    if (maxScore === -1 || plantasCandidatas.length === 0) {
        // Seleccionar una planta completamente aleatoria si no hay coincidencias o no se hizo ninguna selección.
        suculentaIdeal = getRandomElement(plantasCompletas);
    } else {
        // Si hay coincidencias, selecciona una al azar entre las de mayor puntuación
        suculentaIdeal = getRandomElement(plantasCandidatas);
    }

    // Asegurarse de que siempre haya una suculenta para mostrar
    if (!suculentaIdeal && plantasCompletas.length > 0) {
        suculentaIdeal = getRandomElement(plantasCompletas);
    } else if (!suculentaIdeal) {
        lightboxContentQuiz.innerHTML = `
            <div class="lightbox-quiz-result" style="padding: 20px;">
                <h3 style="color: red;">¡Ups!</h3>
                <p>No se pudo encontrar una suculenta ideal en este momento. Intenta de nuevo más tarde o verifica la carga de datos.</p>
                <img src="fotos/placeholder_error.png" alt="Error de resultado" style="max-width: 150px; margin-top: 15px; border: none;">
            </div>
        `;
        lightboxContentQuiz.style.display = 'block';
        lightbox.style.display = 'flex';
        return;
    }

    // Preparar el resultado para mostrar, utilizando datos de la planta ideal
    const nombrePlanta = suculentaIdeal.nombre || 'Nombre no disponible';
    const imagenUrl = suculentaIdeal.imagenUrl || 'placeholder.jpg';
    const descripcionExtendidaPlanta = suculentaIdeal.descripcionExtendida || 'Descripción extendida no disponible.';
    const simbolismoPlanta = suculentaIdeal.descripcion || 'Simbolismo no disponible.'; // `descripcion` es el campo para simbolismo
    const energiaPlanta = suculentaIdeal.energia || 'Energía no especificada.';
    const arquetipoPlanta = getRandomElement(suculentaIdeal.arquetipos) || 'Sin arquetipos disponibles.'; // Se usa uno aleatorio del array

    // Formato del resultado según la imagen de ejemplo
    lightboxContentQuiz.innerHTML = `
        <div class="lightbox-quiz-result">
            <h3 class="plant-name">${nombrePlanta}</h3>
            <img src="${imagenUrl}" alt="${nombrePlanta}" class="resultado-imagen">
            <div class="quiz-summary">
                <h4>Tus respuestas:</h4>
                <p><strong>Signo zodiacal:</strong> ${signo.charAt(0).toUpperCase() + signo.slice(1)}</p>
                <p><strong>Aspecto de la vida que te gustaría potenciar:</strong> ${aspecto.charAt(0).toUpperCase() + aspecto.slice(1)}</p>
                <p><strong>Elemento con el que te identificas más:</strong> ${elemento.charAt(0).toUpperCase() + elemento.slice(1)}</p>
                <p><strong>Nivel para trabajar tu energía:</strong> ${nivel.charAt(0).toUpperCase() + nivel.slice(1)}</p>
            </div>
            <div class="plant-details">
                <p class="plant-description-extended">${descripcionExtendidaPlanta}</p>
                <p><strong>Simbolismo:</strong> ${simbolismoPlanta}</p>
                <p><strong>Tip de uso:</strong> Ideal para rituales de cierre de ciclos y nuevos comienzos, especialmente al atardecer.</p>
                <p class="plant-current-energy"><strong>Tu energía actual pide:</strong> ${energiaPlanta}</p>
                <p class="plant-reflection">Esta planta resuena especialmente con quienes, como vos, buscan trabajar sobre **${aspecto}** desde el nivel **${nivel}**.</p>
                <p class="plant-arquetipo">La forma y energía de esta planta te ayudarán a expresar tu potencial, recordar tu valor y avanzar hacia lo que buscás, acompañándote con su presencia silenciosa y constante.</p>
                <p class="plant-wisdom">En la tradición de los sabios antiguos, cada planta era elegida como un espejo del alma: la tuya aporta justo el matiz y la fuerza que tu momento necesita.</p>
            </div>
        </div>
    `;
    lightboxContentQuiz.style.display = 'block'; // Mostrar el contenido del quiz dentro del lightbox
    lightbox.style.display = 'flex'; // Mostrar el lightbox
}


// Lógica para los carruseles y el manejo del lightbox
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider-inner');

    sliders.forEach(slider => {
        const images = slider.querySelectorAll('img');
        const sliderWidth = slider.offsetWidth;
        let totalImagesWidth = 0;

        images.forEach(img => {
            totalImagesWidth += img.offsetWidth;
        });

        slider.style.width = `${totalImagesWidth}px`;

        // Configurar el click para el lightbox para las imágenes del carrusel
        images.forEach(img => {
            img.addEventListener('click', () => {
                const lightbox = document.getElementById('lightbox');
                const lightboxImg = document.getElementById('lightbox-img');
                const lightboxContentQuiz = document.getElementById('lightbox-content-quiz');

                const largeSrc = img.getAttribute('data-large-src');

                if (largeSrc) {
                    lightboxImg.src = largeSrc;
                    lightboxImg.style.display = 'block'; // Mostrar la imagen grande
                    lightboxContentQuiz.style.display = 'none'; // Ocultar el contenido del quiz
                    lightbox.style.display = 'flex'; // Mostrar el lightbox
                }
            });
        });
    });

    // Cerrar el lightbox
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.lightbox-close');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxContentQuiz = document.getElementById('lightbox-content-quiz');

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
            lightboxImg.style.display = 'none'; // Asegurarse de ocultar la imagen
            lightboxContentQuiz.style.display = 'none'; // Asegurarse de ocultar el contenido del quiz
        });
    }
    // Cerrar al hacer click fuera del contenido (en el fondo oscuro)
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
                lightboxImg.style.display = 'none'; // Asegurarse de ocultar la imagen
                lightboxContentQuiz.style.display = 'none'; // Asegurarse de ocultar el contenido del quiz
            }
        });
    }
});