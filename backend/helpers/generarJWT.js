const jwt = require('jsonwebtoken');

const generarJWT = (id) => {
    return new Promise((resolve, reject) => {
        // Usamos el secreto de JWT desde las variables de entorno.
        jwt.sign(id, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 // 1 hora
        }, (err, token) => {
            (err) ? reject(err) : resolve(token);
        });
    });
}

module.exports = generarJWT;
