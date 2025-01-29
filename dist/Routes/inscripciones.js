"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inscripciones_1 = require("../controllers/inscripciones");
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../middleware/validateRequest");
const router = (0, express_1.Router)();
// Validación del parámetro `id`
const validateId = [
    (0, express_validator_1.param)('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest_1.validateRequest
];
// Validaciones para POST y PUT
const validateInscripcion = [
    (0, express_validator_1.body)('nombre_nino').notEmpty().isString().withMessage('El nombre del niño es obligatorio y debe ser un texto.'),
    (0, express_validator_1.body)('fecha_nacimiento').notEmpty().isDate().withMessage('La fecha de nacimiento debe ser válida.'),
    (0, express_validator_1.body)('direccion').notEmpty().isString().withMessage('La dirección es obligatoria y debe ser un texto.'),
    (0, express_validator_1.body)('telefono').optional().isString().withMessage('El teléfono debe ser un texto.'),
    (0, express_validator_1.body)('celular').optional().isString().withMessage('El celular debe ser un texto.'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('El email debe ser válido.'),
    (0, express_validator_1.body)('tipo_familia')
        .optional()
        .isIn(['Nuclear', 'Monoparental', 'Extensa', 'Otro'])
        .withMessage('El tipo de familia debe ser "Nuclear", "Monoparental", "Extensa" o "Otro".'),
    (0, express_validator_1.body)('vive_con').optional().isString().withMessage('Con quién vive el niño debe ser un texto.'),
    (0, express_validator_1.body)('numero_hermanos').optional().isInt().withMessage('El número de hermanos debe ser un número entero.'),
    validateRequest_1.validateRequest
];
// Definición de rutas
router.get('/', inscripciones_1.getInscripciones); // Obtener todas las inscripciones
router.get('/:id', validateId, inscripciones_1.getInscripcion); // Obtener una inscripción por ID
router.post('/', validateInscripcion, inscripciones_1.postInscripcion); // Crear una nueva inscripción
router.put('/:id', validateId, validateInscripcion, inscripciones_1.putInscripcion); // Actualizar una inscripción existente
router.delete('/:id', validateId, inscripciones_1.deleteInscripcion); // Eliminar una inscripción
exports.default = router;
