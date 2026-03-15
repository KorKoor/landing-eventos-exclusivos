export const initAnimations = () => {
    // Seleccionamos el contenedor de texto del Hero
    const heroTextContainer = document.querySelector('.absolute.inset-0.flex.flex-col');
    const scrollContainer = document.getElementById('scroll-container');
    
    if (!heroTextContainer || !scrollContainer) return;

    const animateTextOnScroll = () => {
        const scrollTop = window.scrollY;
        
        // Queremos que el texto desaparezca durante el primer 20% del scroll del canvas
        const fadeEndPixel = window.innerHeight * 0.8; 
        
        // Calculamos un valor de 1 (totalmente visible) a 0 (invisible)
        let opacity = 1 - (scrollTop / fadeEndPixel);
        
        // Evitamos valores negativos
        if (opacity < 0) opacity = 0;
        
        // Calculamos cuánto se mueve hacia arriba (efecto Parallax suave)
        // Se moverá un máximo de 50px hacia arriba
        let translateY = (scrollTop / fadeEndPixel) * -50;

        // Aplicamos los estilos directamente usando requestAnimationFrame para fluidez
        requestAnimationFrame(() => {
            heroTextContainer.style.opacity = opacity.toFixed(2);
            heroTextContainer.style.transform = `translateY(${translateY}px)`;
            
            // Si la opacidad es 0, desactivamos los pointer events para que no estorbe
            heroTextContainer.style.pointerEvents = opacity === 0 ? 'none' : 'auto';
        });
    };

    window.addEventListener('scroll', animateTextOnScroll);
};