export const initCarousel = () => {
    const slider = document.getElementById('drag-carousel');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;

    // --- Lógica de Arrastre (Mouse Drag) ---
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('cursor-grabbing');
        slider.classList.remove('cursor-grab', 'snap-x', 'snap-mandatory'); // Quitamos el snap al arrastrar para más fluidez
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('cursor-grabbing');
        slider.classList.add('cursor-grab', 'snap-x', 'snap-mandatory');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('cursor-grabbing');
        slider.classList.add('cursor-grab', 'snap-x', 'snap-mandatory'); // Regresamos el snap al soltar
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2; // El * 2 define la velocidad de arrastre
        slider.scrollLeft = scrollLeft - walk;
    });

    // --- Lógica de los Botones (Desktop) ---
    const scrollAmount = window.innerWidth * 0.4; // Desplaza el ancho aproximado de una foto

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }
};