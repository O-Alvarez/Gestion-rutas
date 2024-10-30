import sql from 'mssql'
import dotenv from 'dotenv'
dotenv.config()

const dbSettings = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: true, // Activa el cifrado para conexiones seguras en Azure
        trustServerCertificate: true // Configuración adicional si se requiere
    }
}

// Función para conectar a la base de datos
export async function getConnection() {
    try {
        const pool = await sql.connect(dbSettings)
        return pool
    } catch (error) {
        return error
    }
}
