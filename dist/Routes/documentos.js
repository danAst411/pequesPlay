"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentos_1 = require("../controllers/documentos");
const express_validator_1 = require("express-validator");
const validateRequest_1 = require("../middleware/validateRequest");
const router = (0, express_1.Router)();
// Validación del parámetro `id`
const validateId = [
    (0, express_validator_1.param)('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest_1.validateRequest
];
// Validaciones para POST y PUT
const validateDocumento = [
    (0, express_validator_1.body)('inscripcion_id').notEmpty().isInt().withMessage('El ID de inscripción es obligatorio y debe ser un número.'),
    (0, express_validator_1.body)('tipo_documento')
        .notEmpty()
        .isIn([
        'Foto Carnet',
        'Cédula Niño',
        'Cédula Padre',
        'Cédula Madre',
        'Cédula Autorizado',
        'Carnet Vacunación',
    ])
        .withMessage('El tipo de documento no es válido.'),
    (0, express_validator_1.body)('url_documento').notEmpty().isString().withMessage('La URL del documento es obligatoria y debe ser un texto.'),
    validateRequest_1.validateRequest
];
// Definición de rutas
router.get('/', documentos_1.getDocumentos); // Obtener todos los documentos
router.get('/:id', validateId, documentos_1.getDocumento); // Obtener un documento por ID
router.post('/', validateDocumento, documentos_1.postDocumento); // Crear un nuevo documento
router.put('/:id', validateId, validateDocumento, documentos_1.putDocumento); // Actualizar un documento existente
router.delete('/:id', validateId, documentos_1.deleteDocumento); // Eliminar un documento
exports.default = router;
