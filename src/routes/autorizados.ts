import { Router } from "express";
import { getAutorizados, getAutorizado, postAutorizado, putAutorizado, deleteAutorizado } from "../controllers/autorizados";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

// Validación del parámetro `id`
const validateId = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest
];

// Validaciones para POST y PUT
const validateAutorizado = [
    body('inscripcion_id').notEmpty().isInt().withMessage('El ID de inscripción es obligatorio y debe ser un número.'),
    body('ci').notEmpty().isString().withMessage('La cédula es obligatoria y debe ser un texto.'),
    body('nombres').notEmpty().isString().withMessage('El nombre es obligatorio y debe ser un texto.'),
    body('apellidos').notEmpty().isString().withMessage('El apellido es obligatorio y debe ser un texto.'),
    body('parentesco').optional().isString().withMessage('El parentesco debe ser un texto.'),
    body('celular').optional().isString().withMessage('El celular debe ser un texto.'),
    body('emergencia').optional().isBoolean().withMessage('El campo emergencia debe ser verdadero o falso.'),
    validateRequest
];

// Definición de rutas
router.get('/', getAutorizados); // Obtener todos los autorizados
router.get('/:id', validateId, getAutorizado); // Obtener un autorizado por ID
router.post('/', validateAutorizado, postAutorizado); // Crear un nuevo autorizado
router.put('/:id', validateId, validateAutorizado, putAutorizado); // Actualizar un autorizado existente
router.delete('/:id', validateId, deleteAutorizado); // Eliminar un autorizado

export default router;
