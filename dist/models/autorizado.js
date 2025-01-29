"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Autorizados = connection_1.default.define('autorizados', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inscripcion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'inscripciones', // Debe coincidir con el nombre de la tabla en MySQL
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    ci: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    nombres: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    parentesco: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    celular: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    emergencia: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'autorizados', // Asegúrate de que el nombre de la tabla coincide con MySQL
    timestamps: false
});
exports.default = Autorizados;
