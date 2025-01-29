import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Autorizados = db.define('autorizados', {
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
    ci: {
        type: DataTypes.STRING(20),
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
    parentesco: {
        type: DataTypes.STRING(50)
    },
    celular: {
        type: DataTypes.STRING(20)
    },
    emergencia: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'autorizados', // Asegúrate de que el nombre de la tabla coincide con MySQL
    timestamps: false
});

export default Autorizados;
