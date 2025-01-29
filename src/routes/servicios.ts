import { Router } from "express";
import { getServicios, getServicio, postServicio, putServicio, deleteServicio } from "../controllers/servicios";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

// Validación del parámetro `id`
const validateId = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest
];

// Validaciones para POST y PUT
const validateServicio = [
    body('inscripcion_id').notEmpty().isInt().withMessage('El ID de inscripción es obligatorio y debe ser un número.'),
    body('servicio')
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
    body('horario').optional().isString().withMessage('El horario debe ser un texto.'),
    validateRequest
];

// Definición de rutas
router.get('/', getServicios); // Obtener todos los servicios
router.get('/:id', validateId, getServicio); // Obtener un servicio por ID
router.post('/', validateServicio, postServicio); // Crear un nuevo servicio
router.put('/:id', validateId, validateServicio, putServicio); // Actualizar un servicio existente
router.delete('/:id', validateId, deleteServicio); // Eliminar un servicio

export default router;
