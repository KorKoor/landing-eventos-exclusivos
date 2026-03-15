export const initScrollReveal = () => {
    // Seleccionamos todos los elementos que tengan la clase .reveal
    const reveals = document.querySelectorAll('.reveal');

    // Configuramos el observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Si el elemento entra en la pantalla, le agregamos la clase .active
                entry.target.classList.add('active');
                // Opcional: Dejar de observar una vez animado para que no se repita
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px 0px -50px 0px" // Un pequeño margen para que se active un poco antes
    });

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
};