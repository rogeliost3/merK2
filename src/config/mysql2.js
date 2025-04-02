import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();
const DB_HOST=process.env.DB_HOST;
const DB_USER=process.env.DB_USER;
const DB_PASSWORD=process.env.DB_PASSWORD;
const DB_PORT=process.env.DB_PORT;
const DB_NAME=process.env.DB_NAME;


async function getConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        port: '3307',
        password: '1234', //<<-- ó 714748
        database: 'merk2'
    });
    return connection
}

async function testConnection() {
    try {
        const c = await getConnection();
        c.
        console.log("conexion ok");
        c.end();
    } catch (error) {
        console.log("error conectando " + error);
    } 
}

export { getConnection, testConnection }