import { Request, Response, NextFunction } from 'express';
import Servicios from '../models/servicio'; // Asegúrate de que la ruta sea correcta

// Obtener todos los servicios
export const getServicios = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const servicios = await Servicios.findAll();
        res.json(servicios);
    } catch (error) {
        next(error);
    }
};

// Obtener un servicio por ID
export const getServicio = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const servicio = await Servicios.findByPk(id);
        if (!servicio) {
            res.status(404).json({ message: `No se encontró un servicio con el ID ${id}` });
            return;
        }
        res.json(servicio);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo servicio
export const postServicio = async (req: Request, res: Response, next: NextFunction) => {
    const { inscripcion_id, servicio, horario } = req.body;

    try {
        const nuevoServicio = await Servicios.create({
            inscripcion_id,
            servicio,
            horario,
        });

        res.status(201).json(nuevoServicio);
    } catch (error) {
        next(error);
    }
};

// Actualizar un servicio existente
export const putServicio = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { inscripcion_id, servicio, horario } = req.body;

    try {
        const servicioExistente = await Servicios.findByPk(id);
        if (!servicioExistente) {
            res.status(404).json({ message: `No se encontró un servicio con el ID ${id}` });
            return;
        }

        await servicioExistente.update({
            inscripcion_id,
            servicio,
            horario,
        });

        res.json(servicioExistente);
    } catch (error) {
        next(error);
    }
};

// Eliminar un servicio
export const deleteServicio = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const servicio = await Servicios.findByPk(id);
        if (!servicio) {
            res.status(404).json({ message: `No se encontró un servicio con el ID ${id}` });
            return;
        }

        await servicio.destroy();
        res.json({ message: `El servicio con ID ${id} fue eliminado correctamente` });
    } catch (error) {
        next(error);
    }
};
