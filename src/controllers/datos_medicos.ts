import { Request, Response, NextFunction } from 'express';
import DatosMedicos from '../models/datos_medico'; // Asegúrate de que la ruta sea correcta

// Obtener todos los datos médicos
export const getDatosMedicos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const datosMedicos = await DatosMedicos.findAll();
        res.json(datosMedicos);
    } catch (error) {
        next(error);
    }
};

// Obtener un dato médico por ID
export const getDatoMedico = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const datoMedico = await DatosMedicos.findByPk(id);
        if (!datoMedico) {
            res.status(404).json({ message: `No se encontró un dato médico con el ID ${id}` });
            return;
        }
        res.json(datoMedico);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo dato médico
export const postDatoMedico = async (req: Request, res: Response, next: NextFunction) => {
    const {
        inscripcion_id,
        tipo_sangre,
        observaciones_embarazo,
        semanas_termino,
        tipo_parto,
        examen_audicion,
        examen_vision,
        enfermedades,
        alergias,
        medicamentos_prohibidos,
        medicamentos_emergencia,
    } = req.body;

    try {
        const nuevoDatoMedico = await DatosMedicos.create({
            inscripcion_id,
            tipo_sangre,
            observaciones_embarazo,
            semanas_termino,
            tipo_parto,
            examen_audicion,
            examen_vision,
            enfermedades,
            alergias,
            medicamentos_prohibidos,
            medicamentos_emergencia,
        });

        res.status(201).json(nuevoDatoMedico);
    } catch (error) {
        next(error);
    }
};

// Actualizar un dato médico existente
export const putDatoMedico = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const {
        inscripcion_id,
        tipo_sangre,
        observaciones_embarazo,
        semanas_termino,
        tipo_parto,
        examen_audicion,
        examen_vision,
        enfermedades,
        alergias,
        medicamentos_prohibidos,
        medicamentos_emergencia,
    } = req.body;

    try {
        const datoMedico = await DatosMedicos.findByPk(id);
        if (!datoMedico) {
            res.status(404).json({ message: `No se encontró un dato médico con el ID ${id}` });
            return;
        }

        await datoMedico.update({
            inscripcion_id,
            tipo_sangre,
            observaciones_embarazo,
            semanas_termino,
            tipo_parto,
            examen_audicion,
            examen_vision,
            enfermedades,
            alergias,
            medicamentos_prohibidos,
            medicamentos_emergencia,
        });

        res.json(datoMedico);
    } catch (error) {
        next(error);
    }
};

// Eliminar un dato médico
export const deleteDatoMedico = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const datoMedico = await DatosMedicos.findByPk(id);
        if (!datoMedico) {
            res.status(404).json({ message: `No se encontró un dato médico con el ID ${id}` });
            return;
        }

        await datoMedico.destroy();
        res.json({ message: `El dato médico con ID ${id} fue eliminado correctamente` });
    } catch (error) {
        next(error);
    }
};
