"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servicios_1 = require("../controllers/servicios");
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../middleware/validateRequest");
const router = (0, express_1.Router)();
// Validación del parámetro `id`
const validateId = [
    (0, express_validator_1.param)('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest_1.validateRequest
];
// Validaciones para POST y PUT
const validateServicio = [
    (0, express_validator_1.body)('inscripcion_id').notEmpty().isInt().withMessage('El ID de inscripción es obligatorio y debe ser un número.'),
    (0, express_validator_1.body)('servicio')
        .notEmpty()
        .isIn([
        'Estimulación Temprana',
        'Subnivel',
        'Inicial 1',
        'Inicial 2',
        'Tareas dirigidas',
        'Cuidado diario',
        'Apoyo pedagógico',
    ])
        .withMessage('El tipo de servicio no es válido.'),
    (0, express_validator_1.body)('horario').optional().isString().withMessage('El horario debe ser un texto.'),
    validateRequest_1.validateRequest
];
// Definición de rutas
router.get('/', servicios_1.getServicios); // Obtener todos los servicios
router.get('/:id', validateId, servicios_1.getServicio); // Obtener un servicio por ID
router.post('/', validateServicio, servicios_1.postServicio); // Crear un nuevo servicio
router.put('/:id', validateId, validateServicio, servicios_1.putServicio); // Actualizar un servicio existente
router.delete('/:id', validateId, servicios_1.deleteServicio); // Eliminar un servicio
exports.default = router;
