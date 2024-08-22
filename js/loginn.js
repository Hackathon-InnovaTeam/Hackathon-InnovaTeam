// Seleccionamos los formularios
const signupForm = document.querySelector('.signup form');
const loginForm = document.querySelector('.login form');

// Seleccionamos los campos de entrada del formulario de registro
const signupPassword = signupForm.querySelector('input[name="password"]');  // Actualizado a 'password'
const signupConfirmPassword = signupForm.querySelector('input[name="passwordConfirm"]');  // Actualizado a 'passwordConfirm'

// Seleccionamos los campos de entrada del formulario de inicio de sesión
const loginEmail = loginForm.querySelector('input[name="email"]');
const loginPassword = loginForm.querySelector('input[name="pswd"]');

//Validacion de las contraseñas 
signupForm.addEventListener('submit', function(event) {
    if (signupPassword.value !== signupConfirmPassword.value) {
        event.preventDefault();  // Previene que el formulario se envíe
        console.log('Las contraseñas no coinciden.');
        alert('Las contraseñas no coinciden.');
    } else {
        console.log('Las contraseñas coinciden.');
    }
});

console.log("archivo login bien ")