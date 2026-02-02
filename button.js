document.addEventListener('DOMContentLoaded', () => {
    const btnMenu = document.getElementById('btn-menu');
    const navLinks = document.querySelector('.nav-links');

    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            console.log("¡Click detectado!");
        });
    }
});