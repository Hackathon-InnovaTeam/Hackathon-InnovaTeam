// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (token) {
        // Si hay token, mostrar el botón de cerrar sesión
        document.getElementById('nav-item').innerHTML = `<button id="logout" class="logout-btn">Cerrar Sesión</button>`;

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = './index.html'; // Redirige al index al cerrar sesión
        });

        // Redirige al landing page si está en la página de login
        if (window.location.pathname === '/login.html') {
            window.location.href = './landing.html'; // Redirige al landing al iniciar sesión
        }
    } else {
        // Si no hay token y el usuario está en login.html, no hacer nada especial
        // El usuario debe poder elegir iniciar sesión o navegar por el index.html
    }
});
