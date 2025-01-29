"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Padres = connection_1.default.define('padres', {
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
    tipo: {
        type: sequelize_1.DataTypes.ENUM('Padre', 'Madre'),
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
    profesion: {
        type: sequelize_1.DataTypes.STRING(100)
    },
    lugar_trabajo: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING(255)
    },
    celular: {
        type: sequelize_1.DataTypes.STRING(20)
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100)
    }
}, {
    tableName: 'padres',
    timestamps: false
});
exports.default = Padres;
