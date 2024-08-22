// auth.js
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        // Si no hay token, redirigir al usuario al login
        if (window.location.pathname !== '/login.html') {
            window.location.href = './login.html'; // Redirige al login si no hay token
        }
    } else {
        // Si hay token, mostrar el botón de cerrar sesión
        document.getElementById('nav-item').innerHTML = `<li><a href="" id="logout">Cerrar Sesión</a></li>`;

        document.getElementById('logout').addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = './login.html'; // Redirige al login al cerrar sesión
        });

        // Redirige al dashboard si está en la página de login
        if (window.location.pathname === '/login.html') {
            window.location.href = './index.html'; // Redirige al dashboard al iniciar sesión
        }
    }
});
