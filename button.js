document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('btn-menu');
    const navLinks = document.querySelector('.nav-links'); // Usamos la clase para asegurar

    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            console.log("¡Click detectado!"); // Mira la consola (F12) para confirmar
        });
    }
});