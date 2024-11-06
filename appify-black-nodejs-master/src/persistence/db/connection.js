import mysql from 'mysql2/promise';
import 'dotenv/config'

export const connectionDB = await mysql.createConnection(process.env.DB_URL);

// export const connectToDatabase = async () => {
//     try {
//         const connection = await mysql.createConnection(process.env.DATABASE_URL);
//         console.log('Conexión exitosa a la base de datos');
//         return connection; // Devuelve la conexión para usarla más adelante
//     } catch (error) {
//         console.error('Error al conectar a la base de datos:', error);
//         throw error; // Lanza el error para manejarlo en otra parte del código si es necesario
//     }
// }