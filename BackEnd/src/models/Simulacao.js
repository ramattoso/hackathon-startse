import db from '../database/index.js';
import { DataTypes } from 'sequelize';
import Usuarios from './Usuario.js';

const Simulacao = db.define(
    'Simulacao', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            notNull: true,
        },
        aporteInicial: {
            type: DataTypes.DECIMAL,
        },
        aporteMensal: {
            type: DataTypes.DECIMAL,
        },
        taxaAA: {
            type: DataTypes.DECIMAL,
        },
        meses: {
            type: DataTypes.INTEGER,
        },
        idUsuario: {
            type: DataTypes.STRING,
            references: {
                model: Usuarios,
                key: "idUsuario",
            },
        },
        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: DataTypes.DATE,
    }, {
        tableName: 'simulacao',
    }
);

export default Simulacao;