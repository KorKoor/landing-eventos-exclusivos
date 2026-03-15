export const initCanvasScroll = () => {
    const canvas = document.getElementById('hero-canvas');
    const container = document.getElementById('inicio'); // Usamos el contenedor padre que tiene la altura
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    const frameCount = 40; 

    // Generador de rutas - Asegúrate que tus archivos terminan en .png y no .PNG
    const currentFrame = index => {
        const num = index.toString().padStart(4, '0');
        const time = ((index - 1) * 0.2).toFixed(2);
        return `assets/video-frames/frame_${num}_${time}s.png`;
    };

    const images = [];
    const imageCache = { loaded: 0 };

    // Precarga agresiva
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            imageCache.loaded++;
            if (i === 1) render(); // Dibujar la primera en cuanto cargue
        };
        img.onerror = () => console.warn(`No se encontró: ${img.src}`);
        images.push(img);
    }

    const setCanvasSize = () => {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        context.scale(dpr, dpr);
        render(); // Redibujar al cambiar tamaño
    };

    const render = () => {
        // Cálculo de índice basado en el scroll real de la página
        const scrollTop = window.scrollY;
        const maxScroll = container.offsetHeight - window.innerHeight;
        const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
        
        // El truco: asegurarnos de que el índice nunca exceda el array
        const frameIndex = Math.min(
            frameCount - 1,
            Math.floor(scrollFraction * frameCount)
        );

        const img = images[frameIndex];
        
        if (img && img.complete && img.naturalWidth !== 0) {
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const imgRatio = img.naturalWidth / img.naturalHeight;
            const canvasRatio = screenWidth / screenHeight;

            let drawW, drawH, drawX, drawY;

            if (canvasRatio > imgRatio) {
                drawW = screenWidth;
                drawH = screenWidth / imgRatio;
                drawX = 0;
                drawY = (screenHeight - drawH) / 2;
            } else {
                drawW = screenHeight * imgRatio;
                drawH = screenHeight;
                drawX = (screenWidth - drawW) / 2;
                drawY = 0;
            }

            context.clearRect(0, 0, screenWidth, screenHeight);
            context.drawImage(img, drawX, drawY, drawW, drawH);
        }
    };

    window.addEventListener('scroll', () => {
        requestAnimationFrame(render);
    }, { passive: true });

    window.addEventListener('resize', setCanvasSize);
    setCanvasSize();
};