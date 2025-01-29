"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const DatosMedicos = connection_1.default.define('datos_medicos', {
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
    tipo_sangre: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: true
    },
    observaciones_embarazo: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    semanas_termino: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    tipo_parto: {
        type: sequelize_1.DataTypes.ENUM('Normal', 'Cesarea'),
        allowNull: true
    },
    examen_audicion: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    examen_vision: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    enfermedades: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    alergias: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    medicamentos_prohibidos: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    medicamentos_emergencia: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'datos_medicos', // Asegúrate de que el nombre de la tabla coincide con MySQL
    timestamps: false
});
exports.default = DatosMedicos;
