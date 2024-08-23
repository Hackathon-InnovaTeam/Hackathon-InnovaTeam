const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const path = require('path'); // Para manejar rutas de archivos
const { newConnection } = require("./bd/BD");
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

// Inicializamos express.
const app = express();

// Aplicamos los middlewares.
app.use(cors()); // Permite peticiones desde cualquier origen.
app.use(morgan('dev')); // Muestra información detallada de las peticiones en la consola.
app.use(express.json()); // Permite a Express procesar JSON en el body de las peticiones.

// Requerimos y aplicamos nuestras rutas de autenticación.
app.use(require('./routes/auth.routes'));

// Servir archivos estáticos desde la carpeta 'client'
app.use(express.static(path.join(__dirname, '../client')));

// Ruta para la página de inicio
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});
// Ruta para landing.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'landing.html'));
});

// Iniciamos el servidor en el puerto 3000.
app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000 http://localhost:3000");
});
