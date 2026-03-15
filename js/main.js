import { initCanvasScroll } from './modules/canvasScroll.js';
import { initNavigation } from './modules/navigation.js';
import { initScrollReveal } from './modules/scrollReveal.js';
import { initCarousel } from './modules/carousel.js'; // <-- Nuevo módulo

document.addEventListener('DOMContentLoaded', () => {
    initCanvasScroll();
    initNavigation();
    initScrollReveal();
    initCarousel(); // <-- Iniciar carrusel
});