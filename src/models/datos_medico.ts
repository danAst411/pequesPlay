import { DataTypes } from 'sequelize';
import db from '../db/connection';

const DatosMedicos = db.define('datos_medicos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inscripcion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'inscripciones', // Debe coincidir con el nombre de la tabla en MySQL
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    tipo_sangre: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    observaciones_embarazo: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    semanas_termino: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tipo_parto: {
        type: DataTypes.ENUM('Normal', 'Cesarea'),
        allowNull: true
    },
    examen_audicion: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    examen_vision: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    enfermedades: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    alergias: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    medicamentos_prohibidos: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    medicamentos_emergencia: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'datos_medicos', // Asegúrate de que el nombre de la tabla coincide con MySQL
    timestamps: false
});

export default DatosMedicos;
