"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const datos_medicos_1 = require("../controllers/datos_medicos");
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../middleware/validateRequest");
const router = (0, express_1.Router)();
// Validación del parámetro `id`
const validateId = [
    (0, express_validator_1.param)('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest_1.validateRequest
];
// Validaciones para POST y PUT
const validateDatoMedico = [
    (0, express_validator_1.body)('inscripcion_id').notEmpty().isInt().withMessage('El ID de inscripción es obligatorio y debe ser un número.'),
    (0, express_validator_1.body)('tipo_sangre').optional().isString().withMessage('El tipo de sangre debe ser un texto.'),
    (0, express_validator_1.body)('observaciones_embarazo').optional().isString().withMessage('Las observaciones del embarazo deben ser texto.'),
    (0, express_validator_1.body)('semanas_termino').optional().isInt().withMessage('Las semanas de término deben ser un número entero.'),
    (0, express_validator_1.body)('tipo_parto').optional().isIn(['Normal', 'Cesarea']).withMessage('El tipo de parto debe ser "Normal" o "Cesarea".'),
    (0, express_validator_1.body)('examen_audicion').optional().isBoolean().withMessage('El examen de audición debe ser verdadero o falso.'),
    (0, express_validator_1.body)('examen_vision').optional().isBoolean().withMessage('El examen de visión debe ser verdadero o falso.'),
    (0, express_validator_1.body)('enfermedades').optional().isString().withMessage('Las enfermedades deben ser texto.'),
    (0, express_validator_1.body)('alergias').optional().isString().withMessage('Las alergias deben ser texto.'),
    (0, express_validator_1.body)('medicamentos_prohibidos').optional().isString().withMessage('Los medicamentos prohibidos deben ser texto.'),
    (0, express_validator_1.body)('medicamentos_emergencia').optional().isString().withMessage('Los medicamentos de emergencia deben ser texto.'),
    validateRequest_1.validateRequest
];
// Definición de rutas
router.get('/', datos_medicos_1.getDatosMedicos); // Obtener todos los datos médicos
router.get('/:id', validateId, datos_medicos_1.getDatoMedico); // Obtener un dato médico por ID
router.post('/', validateDatoMedico, datos_medicos_1.postDatoMedico); // Crear un nuevo dato médico
router.put('/:id', validateId, validateDatoMedico, datos_medicos_1.putDatoMedico); // Actualizar un dato médico existente
router.delete('/:id', validateId, datos_medicos_1.deleteDatoMedico); // Eliminar un dato médico
exports.default = router;
