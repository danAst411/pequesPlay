"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const autorizados_1 = require("../controllers/autorizados");
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../middleware/validateRequest");
const router = (0, express_1.Router)();
// Validación del parámetro `id`
const validateId = [
    (0, express_validator_1.param)('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest_1.validateRequest
];
// Validaciones para POST y PUT
const validateAutorizado = [
    (0, express_validator_1.body)('inscripcion_id').notEmpty().isInt().withMessage('El ID de inscripción es obligatorio y debe ser un número.'),
    (0, express_validator_1.body)('ci').notEmpty().isString().withMessage('La cédula es obligatoria y debe ser un texto.'),
    (0, express_validator_1.body)('nombres').notEmpty().isString().withMessage('El nombre es obligatorio y debe ser un texto.'),
    (0, express_validator_1.body)('apellidos').notEmpty().isString().withMessage('El apellido es obligatorio y debe ser un texto.'),
    (0, express_validator_1.body)('parentesco').optional().isString().withMessage('El parentesco debe ser un texto.'),
    (0, express_validator_1.body)('celular').optional().isString().withMessage('El celular debe ser un texto.'),
    (0, express_validator_1.body)('emergencia').optional().isBoolean().withMessage('El campo emergencia debe ser verdadero o falso.'),
    validateRequest_1.validateRequest
];
// Definición de rutas
router.get('/', autorizados_1.getAutorizados); // Obtener todos los autorizados
router.get('/:id', validateId, autorizados_1.getAutorizado); // Obtener un autorizado por ID
router.post('/', validateAutorizado, autorizados_1.postAutorizado); // Crear un nuevo autorizado
router.put('/:id', validateId, validateAutorizado, autorizados_1.putAutorizado); // Actualizar un autorizado existente
router.delete('/:id', validateId, autorizados_1.deleteAutorizado); // Eliminar un autorizado
exports.default = router;
