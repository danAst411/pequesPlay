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
exports.deleteDatoMedico = exports.putDatoMedico = exports.postDatoMedico = exports.getDatoMedico = exports.getDatosMedicos = void 0;
const datos_medico_1 = __importDefault(require("../models/datos_medico")); // Asegúrate de que la ruta sea correcta
// Obtener todos los datos médicos
const getDatosMedicos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const datosMedicos = yield datos_medico_1.default.findAll();
        res.json(datosMedicos);
    }
    catch (error) {
        next(error);
    }
});
exports.getDatosMedicos = getDatosMedicos;
// Obtener un dato médico por ID
const getDatoMedico = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const datoMedico = yield datos_medico_1.default.findByPk(id);
        if (!datoMedico) {
            res.status(404).json({ message: `No se encontró un dato médico con el ID ${id}` });
            return;
        }
        res.json(datoMedico);
    }
    catch (error) {
        next(error);
    }
});
exports.getDatoMedico = getDatoMedico;
// Crear un nuevo dato médico
const postDatoMedico = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { inscripcion_id, tipo_sangre, observaciones_embarazo, semanas_termino, tipo_parto, examen_audicion, examen_vision, enfermedades, alergias, medicamentos_prohibidos, medicamentos_emergencia, } = req.body;
    try {
        const nuevoDatoMedico = yield datos_medico_1.default.create({
            inscripcion_id,
            tipo_sangre,
            observaciones_embarazo,
            semanas_termino,
            tipo_parto,
            examen_audicion,
            examen_vision,
            enfermedades,
            alergias,
            medicamentos_prohibidos,
            medicamentos_emergencia,
        });
        res.status(201).json(nuevoDatoMedico);
    }
    catch (error) {
        next(error);
    }
});
exports.postDatoMedico = postDatoMedico;
// Actualizar un dato médico existente
const putDatoMedico = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { inscripcion_id, tipo_sangre, observaciones_embarazo, semanas_termino, tipo_parto, examen_audicion, examen_vision, enfermedades, alergias, medicamentos_prohibidos, medicamentos_emergencia, } = req.body;
    try {
        const datoMedico = yield datos_medico_1.default.findByPk(id);
        if (!datoMedico) {
            res.status(404).json({ message: `No se encontró un dato médico con el ID ${id}` });
            return;
        }
        yield datoMedico.update({
            inscripcion_id,
            tipo_sangre,
            observaciones_embarazo,
            semanas_termino,
            tipo_parto,
            examen_audicion,
            examen_vision,
            enfermedades,
            alergias,
            medicamentos_prohibidos,
            medicamentos_emergencia,
        });
        res.json(datoMedico);
    }
    catch (error) {
        next(error);
    }
});
exports.putDatoMedico = putDatoMedico;
// Eliminar un dato médico
const deleteDatoMedico = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const datoMedico = yield datos_medico_1.default.findByPk(id);
        if (!datoMedico) {
            res.status(404).json({ message: `No se encontró un dato médico con el ID ${id}` });
            return;
        }
        yield datoMedico.destroy();
        res.json({ message: `El dato médico con ID ${id} fue eliminado correctamente` });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteDatoMedico = deleteDatoMedico;
