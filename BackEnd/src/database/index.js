import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = "hackthon-startse";
const DB_USER = "root";
const DB_PASS = process.env.DB_PASS;
const DB_CONFIG = {
    dialect: "mysql",
    host: process.env.HOST,
    port: 3306,
};

let db = {};

try {
    db = new Sequelize(DB_NAME, DB_USER, DB_PASS, DB_CONFIG);
} catch (error) {
    console.error('Erro ao tentar conexão com o Banco de dados!')
}
async function hasConection() {

    try {
        await db.authenticate();
        console.log('Banco de dados conectado!');
    } catch (error) {
        console.error('Erro ao tentar conectar ao banco de dados.');
    }
}
Object.assign(db, {
    hasConection,
});

export default db;