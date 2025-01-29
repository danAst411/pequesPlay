import { Request, Response, NextFunction } from 'express';
import Inscripciones from '../models/inscripcion'; // Asegúrate de que la ruta sea correcta

// Obtener todas las inscripciones
export const getInscripciones = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const inscripciones = await Inscripciones.findAll();
        res.json(inscripciones);
    } catch (error) {
        next(error);
    }
};

// Obtener una inscripción por ID
export const getInscripcion = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const inscripcion = await Inscripciones.findByPk(id);
        if (!inscripcion) {
            res.status(404).json({ message: `No se encontró una inscripción con el ID ${id}` });
            return;
        }
        res.json(inscripcion);
    } catch (error) {
        next(error);
    }
};

// Crear una nueva inscripción
export const postInscripcion = async (req: Request, res: Response, next: NextFunction) => {
    const { nombre_nino, fecha_nacimiento, direccion, telefono, celular, email, tipo_familia, vive_con, numero_hermanos } = req.body;

    try {
        const nuevaInscripcion = await Inscripciones.create({
            nombre_nino,
            fecha_nacimiento,
            direccion,
            telefono,
            celular,
            email,
            tipo_familia,
            vive_con,
            numero_hermanos,
        });

        res.status(201).json(nuevaInscripcion);
    } catch (error) {
        next(error);
    }
};

// Actualizar una inscripción existente
export const putInscripcion = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { nombre_nino, fecha_nacimiento, direccion, telefono, celular, email, tipo_familia, vive_con, numero_hermanos } = req.body;

    try {
        const inscripcion = await Inscripciones.findByPk(id);
        if (!inscripcion) {
            res.status(404).json({ message: `No se encontró una inscripción con el ID ${id}` });
            return;
        }

        await inscripcion.update({
            nombre_nino,
            fecha_nacimiento,
            direccion,
            telefono,
            celular,
            email,
            tipo_familia,
            vive_con,
            numero_hermanos,
        });

        res.json(inscripcion);
    } catch (error) {
        next(error);
    }
};

// Eliminar una inscripción
export const deleteInscripcion = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const inscripcion = await Inscripciones.findByPk(id);
        if (!inscripcion) {
            res.status(404).json({ message: `No se encontró una inscripción con el ID ${id}` });
            return;
        }

        await inscripcion.destroy();
        res.json({ message: `La inscripción con ID ${id} fue eliminada correctamente` });
    } catch (error) {
        next(error);
    }
};
