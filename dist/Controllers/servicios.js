"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteServicio = exports.putServicio = exports.postServicio = exports.getServicio = exports.getServicios = void 0;
const servicio_1 = __importDefault(require("../models/servicio")); // Asegúrate de que la ruta sea correcta
// Obtener todos los servicios
const getServicios = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const servicios = yield servicio_1.default.findAll();
        res.json(servicios);
    }
    catch (error) {
        next(error);
    }
});
exports.getServicios = getServicios;
// Obtener un servicio por ID
const getServicio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const servicio = yield servicio_1.default.findByPk(id);
        if (!servicio) {
            res.status(404).json({ message: `No se encontró un servicio con el ID ${id}` });
            return;
        }
        res.json(servicio);
    }
    catch (error) {
        next(error);
    }
});
exports.getServicio = getServicio;
// Crear un nuevo servicio
const postServicio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { inscripcion_id, servicio, horario } = req.body;
    try {
        const nuevoServicio = yield servicio_1.default.create({
            inscripcion_id,
            servicio,
            horario,
        });
        res.status(201).json(nuevoServicio);
    }
    catch (error) {
        next(error);
    }
});
exports.postServicio = postServicio;
// Actualizar un servicio existente
const putServicio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { inscripcion_id, servicio, horario } = req.body;
    try {
        const servicioExistente = yield servicio_1.default.findByPk(id);
        if (!servicioExistente) {
            res.status(404).json({ message: `No se encontró un servicio con el ID ${id}` });
            return;
        }
        yield servicioExistente.update({
            inscripcion_id,
            servicio,
            horario,
        });
        res.json(servicioExistente);
    }
    catch (error) {
        next(error);
    }
});
exports.putServicio = putServicio;
// Eliminar un servicio
const deleteServicio = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const servicio = yield servicio_1.default.findByPk(id);
        if (!servicio) {
            res.status(404).json({ message: `No se encontró un servicio con el ID ${id}` });
            return;
        }
        yield servicio.destroy();
        res.json({ message: `El servicio con ID ${id} fue eliminado correctamente` });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteServicio = deleteServicio;
