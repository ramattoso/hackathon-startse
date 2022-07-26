import db from '../database/index.js';
import { DataTypes } from 'sequelize';

const Usuarios = db.define(
    'Usuarios', {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true,
        },
        nome: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: DataTypes.DATE,
    }, {
        tableName: 'usuarios',
    }
);

 export default Usuarios;