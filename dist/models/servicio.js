"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../db/connection"));
const sequelize_1 = require("sequelize");
const Servicios = connection_1.default.define('servicios', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inscripcion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'inscripciones',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    servicio: {
        type: sequelize_1.DataTypes.ENUM('Estimulación Temprana', 'Subnivel', 'Inicial 1', 'Inicial 2', 'Tareas dirigidas', 'Cuidado diario', 'Apoyo pedagógico'),
        allowNull: false
    },
    horario: {
        type: sequelize_1.DataTypes.STRING(50)
    }
}, {
    tableName: 'servicios', // Asegúrate de que el nombre de la tabla coincide con MySQL
    timestamps: false
});
exports.default = Servicios;
