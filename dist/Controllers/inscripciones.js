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
exports.deleteInscripcion = exports.putInscripcion = exports.postInscripcion = exports.getInscripcion = exports.getInscripciones = void 0;
const inscripcion_1 = __importDefault(require("../models/inscripcion")); // Asegúrate de que la ruta sea correcta
// Obtener todas las inscripciones
const getInscripciones = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inscripciones = yield inscripcion_1.default.findAll();
        res.json(inscripciones);
    }
    catch (error) {
        next(error);
    }
});
exports.getInscripciones = getInscripciones;
// Obtener una inscripción por ID
const getInscripcion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const inscripcion = yield inscripcion_1.default.findByPk(id);
        if (!inscripcion) {
            res.status(404).json({ message: `No se encontró una inscripción con el ID ${id}` });
            return;
        }
        res.json(inscripcion);
    }
    catch (error) {
        next(error);
    }
});
exports.getInscripcion = getInscripcion;
// Crear una nueva inscripción
const postInscripcion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre_nino, fecha_nacimiento, direccion, telefono, celular, email, tipo_familia, vive_con, numero_hermanos } = req.body;
    try {
        const nuevaInscripcion = yield inscripcion_1.default.create({
            nombre_nino,
            fecha_nacimiento,
            direccion,
            telefono,
            celular,
            email,
            tipo_familia,
            vive_con,
            numero_hermanos,
        });
        res.status(201).json(nuevaInscripcion);
    }
    catch (error) {
        next(error);
    }
});
exports.postInscripcion = postInscripcion;
// Actualizar una inscripción existente
const putInscripcion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre_nino, fecha_nacimiento, direccion, telefono, celular, email, tipo_familia, vive_con, numero_hermanos } = req.body;
    try {
        const inscripcion = yield inscripcion_1.default.findByPk(id);
        if (!inscripcion) {
            res.status(404).json({ message: `No se encontró una inscripción con el ID ${id}` });
            return;
        }
        yield inscripcion.update({
            nombre_nino,
            fecha_nacimiento,
            direccion,
            telefono,
            celular,
            email,
            tipo_familia,
            vive_con,
            numero_hermanos,
        });
        res.json(inscripcion);
    }
    catch (error) {
        next(error);
    }
});
exports.putInscripcion = putInscripcion;
// Eliminar una inscripción
const deleteInscripcion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const inscripcion = yield inscripcion_1.default.findByPk(id);
        if (!inscripcion) {
            res.status(404).json({ message: `No se encontró una inscripción con el ID ${id}` });
            return;
        }
        yield inscripcion.destroy();
        res.json({ message: `La inscripción con ID ${id} fue eliminada correctamente` });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteInscripcion = deleteInscripcion;
