const jwt = require('jsonwebtoken');
const { newConnection } = require('../bd/BD');

const validarJWT = async (token) => {
    try {
        // Usamos el metodo verify para verificar el token.
        // El primer parametro es el token que recibimos por el header, y el segundo es el secret con el que firmamos el token.
        const { id } = jwt.verify(token, process.env.JWT_SECRET || 'mysecret');

        const connection = await newConnection();

        // Buscamos el usuario por id.
        const [usuario] = await connection.query('SELECT * FROM USUARIOS WHERE IdUsuario=? LIMIT 1', [id]);

        // En caso de que no exista retornamos false.
        if (!usuario[0]) {
            return false;
        } else {
            // Caso contrario, retornamos el usuario.
            return usuario[0];
        }

    } catch (error) {
        // Si ocurre un error lo mostramos por consola y retornamos false.
        console.log(error);
        return false;
    }
}

module.exports = validarJWT;
