import { Router } from "express";
import { getDocumentos, getDocumento, postDocumento, putDocumento, deleteDocumento } from "../controllers/documentos";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

// Validación del parámetro `id`
const validateId = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest
];

// Validaciones para POST y PUT
const validateDocumento = [
    body('inscripcion_id').notEmpty().isInt().withMessage('El ID de inscripción es obligatorio y debe ser un número.'),
    body('tipo_documento')
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
    body('url_documento').notEmpty().isString().withMessage('La URL del documento es obligatoria y debe ser un texto.'),
    validateRequest
];

// Definición de rutas
router.get('/', getDocumentos); // Obtener todos los documentos
router.get('/:id', validateId, getDocumento); // Obtener un documento por ID
router.post('/', validateDocumento, postDocumento); // Crear un nuevo documento
router.put('/:id', validateId, validateDocumento, putDocumento); // Actualizar un documento existente
router.delete('/:id', validateId, deleteDocumento); // Eliminar un documento

export default router;
