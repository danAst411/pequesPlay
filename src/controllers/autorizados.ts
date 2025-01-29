import { Request, Response, NextFunction } from 'express';
import Autorizados from '../models/autorizado'; // Asegúrate de que la ruta sea correcta

// Obtener todos los autorizados
export const getAutorizados = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const autorizados = await Autorizados.findAll();
        res.json(autorizados);
    } catch (error) {
        next(error);
    }
};

// Obtener un autorizado por ID
export const getAutorizado = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const autorizado = await Autorizados.findByPk(id);
        if (!autorizado) {
            res.status(404).json({ message: `No se encontró un autorizado con el ID ${id}` });
            return;
        }
        res.json(autorizado);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo autorizado
export const postAutorizado = async (req: Request, res: Response, next: NextFunction) => {
    const { inscripcion_id, ci, nombres, apellidos, parentesco, celular, emergencia } = req.body;

    try {
        const nuevoAutorizado = await Autorizados.create({
            inscripcion_id,
            ci,
            nombres,
            apellidos,
            parentesco,
            celular,
            emergencia,
        });

        res.status(201).json(nuevoAutorizado);
    } catch (error) {
        next(error);
    }
};

// Actualizar un autorizado existente
export const putAutorizado = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { inscripcion_id, ci, nombres, apellidos, parentesco, celular, emergencia } = req.body;

    try {
        const autorizado = await Autorizados.findByPk(id);
        if (!autorizado) {
            res.status(404).json({ message: `No se encontró un autorizado con el ID ${id}` });
            return;
        }

        await autorizado.update({
            inscripcion_id,
            ci,
            nombres,
            apellidos,
            parentesco,
            celular,
            emergencia,
        });

        res.json(autorizado);
    } catch (error) {
        next(error);
    }
};

// Eliminar un autorizado
export const deleteAutorizado = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const autorizado = await Autorizados.findByPk(id);
        if (!autorizado) {
            res.status(404).json({ message: `No se encontró un autorizado con el ID ${id}` });
            return;
        }

        await autorizado.destroy();
        res.json({ message: `El autorizado con ID ${id} fue eliminado correctamente` });
    } catch (error) {
        next(error);
    }
};
