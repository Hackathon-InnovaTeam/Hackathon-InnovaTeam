// Tomamos el form del html.
const form = document.getElementById('form-iniciosesion');

// Funcion para iniciar sesión.
const login = async (e) => {
    // Evitamos el evento submit.
    e.preventDefault();

    // Tomamos los valores de los inputs.
    const email = document.getElementById('usuario').value;
    const password = document.getElementById('contraseña').value;

    try {
        // Realizamos la petición a nuestro servidor.
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-type': 'application/json' }
        });

        // Convertimos en json la respuesta.
        const data = await response.json();

        // Mostrar mensaje de éxito o error.
        if (response.ok) {
            alert(data.msg); // Mensaje de éxito
            localStorage.setItem('token', data.token);
            window.location.href = '/client/landing.html'; // Redirigir al usuario
        } else {
            alert(data.msg); // Mensaje de error
        }

    } catch (error) {
        // Mostrar mensaje de error en caso de excepción.
        alert('Error: ' + error.message);
    }
};

// Añadimos el evento submit al formulario.
form.addEventListener('submit', login);
