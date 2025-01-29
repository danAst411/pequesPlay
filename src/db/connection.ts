
import { Sequelize } from 'sequelize';

const db = new Sequelize('peques_play', 'root', 'admin123@', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, // Enable logging
    });

export default db;