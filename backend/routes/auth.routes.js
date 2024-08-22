const { registro, login } = require('../controllers/auth.controller');
const express = require('express');

// Inicializamos el router de Express.
const router = express.Router();

// Ruta para registro de usuarios con el método POST.
router.post('/api/register', registro);

// Ruta para login de usuarios con el método POST.
router.post('/api/login', login);

// Exportamos las rutas para que puedan ser utilizadas en la aplicación principal.
module.exports = router;
