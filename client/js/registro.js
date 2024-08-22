document.getElementById('form-registro').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el envío del formulario por defecto

    // Obtiene los valores de los campos del formulario
    const nombre_apellido = document.querySelector('input[name="txt"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const passwordConfirm = document.querySelector('input[name="passwordConfirm"]').value;

    // Validación básica para confirmar que las contraseñas coinciden
    if (password !== passwordConfirm) {
        alert('Las contraseñas no coinciden');
        return;
    }

    try {
        // Envía los datos al servidor usando Fetch API
        const response = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre_apellido,
                email,
                password
            })
        });

        // Verifica si la respuesta fue exitosa
        if (response.ok) {
            const data = await response.json();
            alert('Registrado correctamente');
            // Aquí podrías redirigir al usuario a otra página si es necesario
        } else {
            // Manejo de errores si la respuesta no es exitosa
            const errorData = await response.json();
            alert(`Error: ${errorData.msg || 'Error en el registro'}`);
        }
    } catch (error) {
        // Manejo de errores en caso de problemas con la conexión
        console.error('Error en la conexión con el servidor:', error);
        alert('Error en la conexión con el servidor');
    }
});
