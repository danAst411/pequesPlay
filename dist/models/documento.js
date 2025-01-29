"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Documentos = connection_1.default.define('documentos', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inscripcion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'inscripciones', // Nombre de la tabla en MySQL
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    tipo_documento: {
        type: sequelize_1.DataTypes.ENUM('Foto Carnet', 'Cédula Niño', 'Cédula Padre', 'Cédula Madre', 'Cédula Autorizado', 'Carnet Vacunación'),
        allowNull: false
    },
    url_documento: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'documentos', // Asegura que coincida con la tabla en MySQL
    timestamps: false // Desactiva `createdAt` y `updatedAt`
});
exports.default = Documentos;
