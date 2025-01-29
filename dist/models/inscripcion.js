"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Inscripciones = connection_1.default.define('inscripciones', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_nino: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    fecha_nacimiento: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    telefono: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    celular: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    tipo_familia: {
        type: sequelize_1.DataTypes.ENUM('Nuclear', 'Monoparental', 'Extensa', 'Otro'),
        defaultValue: 'Nuclear'
    },
    vive_con: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    numero_hermanos: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    tableName: 'inscripciones', // Asegúrate de que el nombre de la tabla coincide con MySQL
    timestamps: false
});
exports.default = Inscripciones;
