"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const padres_1 = require("../controllers/padres");
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../middleware/validateRequest"); // Asegúrate de que la ruta es correcta
const router = (0, express_1.Router)();
// Validación del parámetro `id`
const validateId = [
    (0, express_validator_1.param)('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest_1.validateRequest
];
// Validaciones para POST y PUT
const validatePadre = [
    (0, express_validator_1.body)('inscripcion_id').notEmpty().isInt().withMessage('El ID de inscripción es obligatorio y debe ser un número.'),
    (0, express_validator_1.body)('tipo').notEmpty().isIn(['Padre', 'Madre']).withMessage('El tipo debe ser "Padre" o "Madre".'),
    (0, express_validator_1.body)('nombres').notEmpty().isString().withMessage('El nombre es obligatorio y debe ser un texto.'),
    (0, express_validator_1.body)('apellidos').notEmpty().isString().withMessage('El apellido es obligatorio y debe ser un texto.'),
    (0, express_validator_1.body)('profesion').optional().isString().withMessage('La profesión debe ser un texto.'),
    (0, express_validator_1.body)('lugar_trabajo').optional().isString().withMessage('El lugar de trabajo debe ser un texto.'),
    (0, express_validator_1.body)('direccion').optional().isString().withMessage('La dirección debe ser un texto.'),
    (0, express_validator_1.body)('celular').optional().isString().withMessage('El celular debe ser un texto.'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('El email debe ser válido.'),
    validateRequest_1.validateRequest
];
// Definición de rutas
router.get('/', padres_1.getPadres); // Obtener todos los padres
router.get('/:id', validateId, padres_1.getPadre); // Obtener un padre por ID
router.post('/', validatePadre, padres_1.postPadre); // Crear un nuevo padre
router.put('/:id', validateId, validatePadre, padres_1.putPadre); // Actualizar un padre existente
router.delete('/:id', validateId, padres_1.deletePadre); // Eliminar un padre
exports.default = router;
