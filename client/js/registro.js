// Tomamos el form del html.
const form = document.getElementById('form-registro');

// Función para registrar un nuevo usuario.
const registro = async (e) => {
    e.preventDefault();

    // Tomamos los valores de los inputs.
    const nombre_apellido = document.querySelector('input[name="txt"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const passwordConfirm = document.querySelector('input[name="passwordConfirm"]').value;

    let errorMessage = '';

    // Validaciones.
    if (nombre_apellido === '' || email === '' || password === '' || passwordConfirm === '') {
        errorMessage = 'Todos los campos son obligatorios';
    } else if (password.length < 6) {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
    } else if (password !== passwordConfirm) {
        errorMessage = 'Las contraseñas no coinciden';
    }

    if (errorMessage) {
        showAlert(errorMessage);
    } else {
        e.preventDefault(); // Prevenir el envío del formulario mientras se realiza la petición.

        // Realizamos la petición a nuestro servidor.
        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                body: JSON.stringify({ nombre_apellido: nombreApellido, email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!response.ok) {
                showAlert(data.msg);
            } else {
                showAlert(data.msg, true);
            }
        } catch (error) {
            showAlert('Error en la conexión con el servidor');
        }
    }
};

// Función para mostrar alertas.
function showAlert(message, success = false) {
    const alertBox = document.createElement('div');
    alertBox.className = 'alert-box';
    alertBox.innerHTML = `
        <div class="alert-content">
            <h3 id="alertTitle">${success ? 'Éxito' : 'Error'}</h3>
            <p id="alertMessage">${message}</p>
            <button id="alertButton">${success ? 'Iniciar sesión' : 'Cerrar'}</button>
        </div>
    `;
    document.body.appendChild(alertBox);

    document.getElementById('alertButton').onclick = () => {
        if (success) {
            window.location.href = 'login.html';
        } else {
            document.body.removeChild(alertBox);
        }
    };
}

// Añadimos el evento submit al formulario de registro.
form.addEventListener('submit', registro);
