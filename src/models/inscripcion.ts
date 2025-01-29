import { DataTypes } from 'sequelize';
import db from '../db/connection';


const Inscripciones = db.define('inscripciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_nino: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(20)
    },
    celular: {
        type: DataTypes.STRING(20)
    },
    email: {
        type: DataTypes.STRING(100)
    },
    tipo_familia: {
        type: DataTypes.ENUM('Nuclear', 'Monoparental', 'Extensa', 'Otro'),
        defaultValue: 'Nuclear'
    },
    vive_con: {
        type: DataTypes.STRING(255)
    },
    numero_hermanos: {
        type: DataTypes.INTEGER
    }
},{
    tableName: 'inscripciones', // Asegúrate de que el nombre de la tabla coincide con MySQL
    timestamps: false
});

export default Inscripciones;
