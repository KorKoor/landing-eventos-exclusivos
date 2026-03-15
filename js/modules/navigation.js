export const initNavigation = () => {
    const navbar = document.getElementById('navbar');
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    // 1. Efecto Glassmorphism al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-black/70', 'backdrop-blur-md', 'border-gray-800', 'py-4');
            navbar.classList.remove('bg-transparent', 'border-transparent', 'py-6');
        } else {
            navbar.classList.add('bg-transparent', 'border-transparent', 'py-6');
            navbar.classList.remove('bg-black/70', 'backdrop-blur-md', 'border-gray-800', 'py-4');
        }
    }, { passive: true });

    // 2. Control del Menú Móvil
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenu.classList.add('opacity-100', 'pointer-events-auto');
            document.body.style.overflow = 'hidden'; // Evita hacer scroll de fondo
        } else {
            mobileMenu.classList.add('opacity-0', 'pointer-events-none');
            mobileMenu.classList.remove('opacity-100', 'pointer-events-auto');
            document.body.style.overflow = 'auto'; // Restaura el scroll
        }
    };

    mobileBtn.addEventListener('click', toggleMenu);

    // Cerrar menú móvil al hacer clic en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });
};