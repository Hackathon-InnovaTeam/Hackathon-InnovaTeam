// Requerimos las dependencias necesarias.
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
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

// Rutas adicionales para gestionar usuarios.
// Obtener todos los usuarios
app.get("/", async (req, res) => {
    try {
        const connection = await newConnection();
        const [results] = await connection.query("SELECT * FROM USUARIOS");
        res.json(results);
        connection.end();
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Obtener un usuario por ID
app.get("/usuarios/:IdUsuario", async (req, res) => {
    try {
        const connection = await newConnection();
        const id = req.params.IdUsuario;
        const [results] = await connection.query("SELECT * FROM USUARIOS WHERE IdUsuario = ?", [id]);
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
        connection.end();
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
});

// Iniciamos el servidor en el puerto 3000.
app.listen(3000, () => {
    console.log("Servidor iniciado en el puerto 3000 http://localhost:3000");
});
