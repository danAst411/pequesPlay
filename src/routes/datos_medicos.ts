import { Router } from "express";
import { getDatosMedicos, getDatoMedico, postDatoMedico, putDatoMedico, deleteDatoMedico } from "../controllers/datos_medicos";
import { body, param } from "express-validator";
import { validateRequest } from "../middleware/validateRequest";

const router = Router();

// Validación del parámetro `id`
const validateId = [
    param('id').isInt().withMessage('El ID debe ser un número entero'),
    validateRequest
];

// Validaciones para POST y PUT
const validateDatoMedico = [
    body('inscripcion_id').notEmpty().isInt().withMessage('El ID de inscripción es obligatorio y debe ser un número.'),
    body('tipo_sangre').optional().isString().withMessage('El tipo de sangre debe ser un texto.'),
    body('observaciones_embarazo').optional().isString().withMessage('Las observaciones del embarazo deben ser texto.'),
    body('semanas_termino').optional().isInt().withMessage('Las semanas de término deben ser un número entero.'),
    body('tipo_parto').optional().isIn(['Normal', 'Cesarea']).withMessage('El tipo de parto debe ser "Normal" o "Cesarea".'),
    body('examen_audicion').optional().isBoolean().withMessage('El examen de audición debe ser verdadero o falso.'),
    body('examen_vision').optional().isBoolean().withMessage('El examen de visión debe ser verdadero o falso.'),
    body('enfermedades').optional().isString().withMessage('Las enfermedades deben ser texto.'),
    body('alergias').optional().isString().withMessage('Las alergias deben ser texto.'),
    body('medicamentos_prohibidos').optional().isString().withMessage('Los medicamentos prohibidos deben ser texto.'),
    body('medicamentos_emergencia').optional().isString().withMessage('Los medicamentos de emergencia deben ser texto.'),
    validateRequest
];

// Definición de rutas
router.get('/', getDatosMedicos); // Obtener todos los datos médicos
router.get('/:id', validateId, getDatoMedico); // Obtener un dato médico por ID
router.post('/', validateDatoMedico, postDatoMedico); // Crear un nuevo dato médico
router.put('/:id', validateId, validateDatoMedico, putDatoMedico); // Actualizar un dato médico existente
router.delete('/:id', validateId, deleteDatoMedico); // Eliminar un dato médico

export default router;
