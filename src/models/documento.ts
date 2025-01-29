import { DataTypes } from 'sequelize';
import db from '../db/connection';

const Documentos = db.define('documentos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inscripcion_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'inscripciones', // Nombre de la tabla en MySQL
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    tipo_documento: {
        type: DataTypes.ENUM(
            'Foto Carnet',
            'Cédula Niño',
            'Cédula Padre',
            'Cédula Madre',
            'Cédula Autorizado',
            'Carnet Vacunación'
        ),
        allowNull: false
    },
    url_documento: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'documentos', // Asegura que coincida con la tabla en MySQL
    timestamps: false // Desactiva `createdAt` y `updatedAt`
});

export default Documentos;
