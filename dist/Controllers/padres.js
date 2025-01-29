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
exports.postPadre = exports.deletePadre = exports.putPadre = exports.getPadre = exports.getPadres = void 0;
const padre_1 = __importDefault(require("../models/padre")); // Ruta correcta al modelo
// Obtener todos los padres
const getPadres = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const padres = yield padre_1.default.findAll(); // Obtener todos los registros
        res.json(padres);
    }
    catch (error) {
        next(error); // Delegar el manejo del error al middleware de errores
        res.status(404).json({ message: `No se encontró un padre  ` });
    }
});
exports.getPadres = getPadres;
// Obtener un padre por ID
const getPadre = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log(`Buscando padre con ID: ${id}`); // <-- Depuración
    try {
        const padre = yield padre_1.default.findByPk(id);
        console.log('entra en el try');
        if (!padre) {
            res.status(404).json({ message: `No se encontró un padre con el ID ${id}` });
            return; // Asegúrate de detener la ejecución
        }
        res.json(padre);
    }
    catch (error) {
        console.log('entra en el catch');
        next(error); // Delegar el manejo del error al middleware de errores
    }
});
exports.getPadre = getPadre;
// Actualizar un padre existente
const putPadre = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { inscripcion_id, tipo, nombres, apellidos, profesion, lugar_trabajo, direccion, celular, email } = req.body;
    try {
        const padre = yield padre_1.default.findByPk(id);
        if (!padre) {
            res.status(404).json({ message: `No se encontró un padre con el ID ${id}` });
            return;
        }
        yield padre.update({
            inscripcion_id,
            tipo,
            nombres,
            apellidos,
            profesion,
            lugar_trabajo,
            direccion,
            celular,
            email,
        });
        res.json(padre);
    }
    catch (error) {
        next(error);
    }
});
exports.putPadre = putPadre;
// Eliminar un padre
const deletePadre = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const padre = yield padre_1.default.findByPk(id);
        if (!padre) {
            res.status(404).json({ message: `No se encontró un padre con el ID ${id}` });
            return;
        }
        yield padre.destroy(); // Eliminar el registro
        res.json({ message: `El padre con ID ${id} fue eliminado correctamente` });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePadre = deletePadre;
// Crear un nuevo padre
const postPadre = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { inscripcion_id, tipo, nombres, apellidos, profesion, lugar_trabajo, direccion, celular, email } = req.body;
    try {
        const nuevoPadre = yield padre_1.default.create({
            inscripcion_id,
            tipo,
            nombres,
            apellidos,
            profesion,
            lugar_trabajo,
            direccion,
            celular,
            email,
        });
        res.status(201).json(nuevoPadre);
    }
    catch (error) {
        next(error);
    }
});
exports.postPadre = postPadre;
