"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('peques_play', 'root', 'admin123@', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log, // Enable logging
});
exports.default = db;
