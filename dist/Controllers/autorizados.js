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
exports.deleteAutorizado = exports.putAutorizado = exports.postAutorizado = exports.getAutorizado = exports.getAutorizados = void 0;
const autorizado_1 = __importDefault(require("../models/autorizado")); // Asegúrate de que la ruta sea correcta
// Obtener todos los autorizados
const getAutorizados = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const autorizados = yield autorizado_1.default.findAll();
        res.json(autorizados);
    }
    catch (error) {
        next(error);
    }
});
exports.getAutorizados = getAutorizados;
// Obtener un autorizado por ID
const getAutorizado = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const autorizado = yield autorizado_1.default.findByPk(id);
        if (!autorizado) {
            res.status(404).json({ message: `No se encontró un autorizado con el ID ${id}` });
            return;
        }
        res.json(autorizado);
    }
    catch (error) {
        next(error);
    }
});
exports.getAutorizado = getAutorizado;
// Crear un nuevo autorizado
const postAutorizado = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { inscripcion_id, ci, nombres, apellidos, parentesco, celular, emergencia } = req.body;
    try {
        const nuevoAutorizado = yield autorizado_1.default.create({
            inscripcion_id,
            ci,
            nombres,
            apellidos,
            parentesco,
            celular,
            emergencia,
        });
        res.status(201).json(nuevoAutorizado);
    }
    catch (error) {
        next(error);
    }
});
exports.postAutorizado = postAutorizado;
// Actualizar un autorizado existente
const putAutorizado = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { inscripcion_id, ci, nombres, apellidos, parentesco, celular, emergencia } = req.body;
    try {
        const autorizado = yield autorizado_1.default.findByPk(id);
        if (!autorizado) {
            res.status(404).json({ message: `No se encontró un autorizado con el ID ${id}` });
            return;
        }
        yield autorizado.update({
            inscripcion_id,
            ci,
            nombres,
            apellidos,
            parentesco,
            celular,
            emergencia,
        });
        res.json(autorizado);
    }
    catch (error) {
        next(error);
    }
});
exports.putAutorizado = putAutorizado;
// Eliminar un autorizado
const deleteAutorizado = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const autorizado = yield autorizado_1.default.findByPk(id);
        if (!autorizado) {
            res.status(404).json({ message: `No se encontró un autorizado con el ID ${id}` });
            return;
        }
        yield autorizado.destroy();
        res.json({ message: `El autorizado con ID ${id} fue eliminado correctamente` });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAutorizado = deleteAutorizado;
