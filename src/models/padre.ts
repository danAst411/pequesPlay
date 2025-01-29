import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Padres = db.define('padres', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inscripcion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'inscripciones',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    tipo: {
        type: DataTypes.ENUM('Padre', 'Madre'),
        allowNull: false
    },
    nombres: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    profesion: {
        type: DataTypes.STRING(100)
    },
    lugar_trabajo: {
        type: DataTypes.STRING(255)
    },
    direccion: {
        type: DataTypes.STRING(255)
    },
    celular: {
        type: DataTypes.STRING(20)
    },
    email: {
        type: DataTypes.STRING(100)
    }
}, {
    tableName: 'padres',
    timestamps: false
});

export default Padres;
