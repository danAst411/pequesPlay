import { Router } from "express";
import { deletePadre, getPadre, getPadres, postPadre, putPadre } from "../controllers/padres";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validateRequest"; // Asegúrate de que la ruta es correcta

const router = Router();

// Validación del parámetro `id`
const validateId = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest
];

// Validaciones para POST y PUT
const validatePadre = [
    body('inscripcion_id').notEmpty().isInt().withMessage('El ID de inscripción es obligatorio y debe ser un número.'),
    body('tipo').notEmpty().isIn(['Padre', 'Madre']).withMessage('El tipo debe ser "Padre" o "Madre".'),
    body('nombres').notEmpty().isString().withMessage('El nombre es obligatorio y debe ser un texto.'),
    body('apellidos').notEmpty().isString().withMessage('El apellido es obligatorio y debe ser un texto.'),
    body('profesion').optional().isString().withMessage('La profesión debe ser un texto.'),
    body('lugar_trabajo').optional().isString().withMessage('El lugar de trabajo debe ser un texto.'),
    body('direccion').optional().isString().withMessage('La dirección debe ser un texto.'),
    body('celular').optional().isString().withMessage('El celular debe ser un texto.'),
    body('email').optional().isEmail().withMessage('El email debe ser válido.'),
    validateRequest
];

// Definición de rutas
router.get('/', getPadres); // Obtener todos los padres
router.get('/:id', validateId, getPadre); // Obtener un padre por ID
router.post('/', validatePadre, postPadre); // Crear un nuevo padre
router.put('/:id', validateId, validatePadre, putPadre); // Actualizar un padre existente
router.delete('/:id', validateId, deletePadre); // Eliminar un padre

export default router;
