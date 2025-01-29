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
exports.deleteDocumento = exports.putDocumento = exports.postDocumento = exports.getDocumento = exports.getDocumentos = void 0;
const documento_1 = __importDefault(require("../models/documento")); // Asegúrate de que la ruta sea correcta
// Obtener todos los documentos
const getDocumentos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const documentos = yield documento_1.default.findAll();
        res.json(documentos);
    }
    catch (error) {
        next(error);
    }
});
exports.getDocumentos = getDocumentos;
// Obtener un documento por ID
const getDocumento = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const documento = yield documento_1.default.findByPk(id);
        if (!documento) {
            res.status(404).json({ message: `No se encontró un documento con el ID ${id}` });
            return;
        }
        res.json(documento);
    }
    catch (error) {
        next(error);
    }
});
exports.getDocumento = getDocumento;
// Crear un nuevo documento
const postDocumento = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { inscripcion_id, tipo_documento, url_documento } = req.body;
    try {
        const nuevoDocumento = yield documento_1.default.create({
            inscripcion_id,
            tipo_documento,
            url_documento,
        });
        res.status(201).json(nuevoDocumento);
    }
    catch (error) {
        next(error);
    }
});
exports.postDocumento = postDocumento;
// Actualizar un documento existente
const putDocumento = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { inscripcion_id, tipo_documento, url_documento } = req.body;
    try {
        const documento = yield documento_1.default.findByPk(id);
        if (!documento) {
            res.status(404).json({ message: `No se encontró un documento con el ID ${id}` });
            return;
        }
        yield documento.update({
            inscripcion_id,
            tipo_documento,
            url_documento,
        });
        res.json(documento);
    }
    catch (error) {
        next(error);
    }
});
exports.putDocumento = putDocumento;
// Eliminar un documento
const deleteDocumento = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const documento = yield documento_1.default.findByPk(id);
        if (!documento) {
            res.status(404).json({ message: `No se encontró un documento con el ID ${id}` });
            return;
        }
        yield documento.destroy();
        res.json({ message: `El documento con ID ${id} fue eliminado correctamente` });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteDocumento = deleteDocumento;
