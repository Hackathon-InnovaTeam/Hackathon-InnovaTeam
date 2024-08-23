// Requerimos la función de conexión y otras dependencias necesarias
const { newConnection } = require("../bd/BD");
const bcrypt = require('bcrypt');
const generarJWT = require("../helpers/generarJWT");

// Definimos un objeto vacío con el nombre 'ctrl' (abreviatura de controller).
const ctrl = {};

// Controlador para el registro de usuarios
ctrl.registro = async (req, res) => {
    // Desestructuramos los datos que vienen del cuerpo de la petición.
    const { nombre_apellido, email, password } = req.body;

    // Hacemos la conexión a la base de datos.
    const connection = await newConnection();

    // Creamos la consulta.
    const sql = 'INSERT INTO USUARIOS (nombre_apellido, email, contrasenia) VALUES (?,?,?)';

    // Encriptamos la contraseña utilizando la librería bcrypt.
    const hashPassword = bcrypt.hashSync(password, 10); // El segundo parámetro es el número de veces que se ejecuta el algoritmo de encriptación.

    // Ejecutamos la consulta.
    await connection.query(sql, [nombre_apellido, email, hashPassword]);

    // Respondemos a nuestro cliente
    res.json({
        msg: 'Registrado correctamente'
    });
}

// Controlador para el inicio de sesión de usuarios
ctrl.login = async (req, res) => {
    const { email, password } = req.body;

    const connection = await newConnection();

    // Buscamos el usuario en la bd.
    const sql = 'SELECT * FROM USUARIOS WHERE email=? LIMIT 1';
    const [buscarUsuario] = await connection.query(sql, email);
    
    // En caso de que no se encuentre ningún usuario, retornamos un error.
    if (!buscarUsuario[0]) {
        return res.status(400).json({
            msg: 'El usuario no existe'
        });
    }

    // Comparamos las contraseñas con el método compareSync que nos devolverá un true o false.
    const validarPassword = bcrypt.compareSync(password, buscarUsuario[0].contrasenia);

    // En caso de que no coincidan, retornamos un error sin dar información específica de lo que falló.
    if (!validarPassword) {
        return res.status(401).json({
            msg: 'El usuario o contraseña no coinciden'
        });
    }

    // Hacemos uso del helper para generar el token y le pasamos el id.
    const token = await generarJWT({ id: buscarUsuario[0].IdUsuario });

    // Retornamos el token con un mensaje al cliente.
    return res.json({
        msg: 'Inicio de sesión exitoso',
        token
    });
}


ctrl.contacto = async (req, res) => {
    // Desestructuramos los datos que vienen del cuerpo de la petición.
    const { nombre, email, mensaje } = req.body;

    // Hacemos la conexión a la base de datos.
    const connection = await newConnection();

    // Creamos la consulta.
    const sql = 'INSERT INTO CONTACTO (nombre, email, mensaje) VALUES (?,?,?)';

    // Ejecutamos la consulta.
    await connection.query(sql, [nombre, email, mensaje]);

    // Respondemos a nuestro cliente
    res.json({
        msg: 'Mensaje enviado correctamente'
    });
}
// Exportamos el objeto con los controladores.
module.exports = ctrl;
