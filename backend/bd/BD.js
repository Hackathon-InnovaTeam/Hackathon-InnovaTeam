const mysql = require("mysql2/promise");

// Función para crear la base de datos si no existe
const createDatabaseIfNotExists = async () => {
    // Conexión inicial sin especificar base de datos
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    });

    // Crear base de datos si no existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
    await connection.end(); // Cerramos la conexión
};

// Creamos una función para realizar la conexión a la bd
const newConnection = async () => {
    // Llamamos a la función que crea la base de datos si no existe
    await createDatabaseIfNotExists();
    
    // Conexión a la base de datos especificada
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME // nombre de nuestra bd
    });

    // Crear la tabla USUARIOS si no existe
    await connection.query(`CREATE TABLE IF NOT EXISTS USUARIOS (
        IdUsuario INT AUTO_INCREMENT PRIMARY KEY,
        nombre_apellido VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        contrasenia VARCHAR(255) NOT NULL
    )`);

    return connection; // Retornamos la conexión
};

// Exportamos la función para realizar la conexión desde cualquier archivo.
module.exports = {
    newConnection
};
