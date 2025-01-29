import db from '../db/connection';
import { DataTypes } from 'sequelize';

const Servicios = db.define('servicios', {
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
    servicio: {
        type: DataTypes.ENUM(
            'Estimulación Temprana',
            'Subnivel',
            'Inicial 1',
            'Inicial 2',
            'Tareas dirigidas',
            'Cuidado diario',
            'Apoyo pedagógico'
        ),
        allowNull: false
    },
    horario: {
        type: DataTypes.STRING(50)
    }
},{
    tableName: 'servicios', // Asegúrate de que el nombre de la tabla coincide con MySQL
    timestamps: false
});

export default Servicios;
