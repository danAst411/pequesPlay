import { Middleware } from './../../node_modules/express-validator/lib/base.d';
import { Router } from "express";
import { getInscripciones, getInscripcion, postInscripcion, putInscripcion, deleteInscripcion } from "../controllers/inscripciones";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

// Validación del parámetro `id`
const validateId = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest
];

// Validaciones para POST y PUT
const validateInscripcion = [
    body('nombre_nino').notEmpty().isString().withMessage('El nombre del niño es obligatorio y debe ser un texto.'),
    body('fecha_nacimiento').notEmpty().isDate().withMessage('La fecha de nacimiento debe ser válida.'),
    body('direccion').notEmpty().isString().withMessage('La dirección es obligatoria y debe ser un texto.'),
    body('telefono').optional().isString().withMessage('El teléfono debe ser un texto.'),
    body('celular').optional().isString().withMessage('El celular debe ser un texto.'),
    body('email').optional().isEmail().withMessage('El email debe ser válido.'),
    body('tipo_familia')
        .optional()
        .isIn(['Nuclear', 'Monoparental', 'Extensa', 'Otro'])
        .withMessage('El tipo de familia debe ser "Nuclear", "Monoparental", "Extensa" o "Otro".'),
    body('vive_con').optional().isString().withMessage('Con quién vive el niño debe ser un texto.'),
    body('numero_hermanos').optional().isInt().withMessage('El número de hermanos debe ser un número entero.'),
    validateRequest
];

// Definición de rutas
router.get('/', getInscripciones); // Obtener todas las inscripciones
router.get('/:id', validateId, getInscripcion); // Obtener una inscripción por ID
router.post('/', validateInscripcion, postInscripcion); // Crear una nueva inscripción
router.put('/:id', validateId, validateInscripcion, putInscripcion); // Actualizar una inscripción existente
router.delete('/:id', validateId, deleteInscripcion); // Eliminar una inscripción

export default router;
