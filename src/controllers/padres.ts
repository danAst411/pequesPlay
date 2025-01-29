
import { Request, Response, NextFunction } from 'express';
import Padres from '../models/padre'; // Ruta correcta al modelo



// Obtener todos los padres
export const getPadres = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const padres = await Padres.findAll(); // Obtener todos los registros
        res.json(padres);
    } catch (error) {
        next(error); // Delegar el manejo del error al middleware de errores
        res.status(404).json({ message: `No se encontró un padre  ` });
    }
};

// Obtener un padre por ID
export const getPadre = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    console.log(`Buscando padre con ID: ${id}`); // <-- Depuración



    try {
        const padre = await Padres.findByPk(id);
        console.log('entra en el try');
        if (!padre) {
            res.status(404).json({ message: `No se encontró un padre con el ID ${id}` });
            
            return; // Asegúrate de detener la ejecución
            
        }
       
        res.json(padre);
    } 
    catch (error) {
        console.log('entra en el catch');
        next(error); // Delegar el manejo del error al middleware de errores
    }
};

// Actualizar un padre existente
export const putPadre = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { inscripcion_id, tipo, nombres, apellidos, profesion, lugar_trabajo, direccion, celular, email } = req.body;

    try {
        const padre = await Padres.findByPk(id);
        if (!padre) {
            res.status(404).json({ message: `No se encontró un padre con el ID ${id}` });
            return;
        }

        await padre.update({
            inscripcion_id,
            tipo,
            nombres,
            apellidos,
            profesion,
            lugar_trabajo,
            direccion,
            celular,
            email,
        });

        res.json(padre);
    } catch (error) {
        next(error);
    }
};

// Eliminar un padre
export const deletePadre = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const padre = await Padres.findByPk(id);
        if (!padre) {
            res.status(404).json({ message: `No se encontró un padre con el ID ${id}` });
            return;
        }

        await padre.destroy(); // Eliminar el registro
        res.json({ message: `El padre con ID ${id} fue eliminado correctamente` });
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo padre
export const postPadre = async (req: Request, res: Response, next: NextFunction) => {
    const { inscripcion_id, tipo, nombres, apellidos, profesion, lugar_trabajo, direccion, celular, email } = req.body;

    try {
        const nuevoPadre = await Padres.create({
            inscripcion_id,
            tipo,
            nombres,
            apellidos,
            profesion,
            lugar_trabajo,
            direccion,
            celular,
            email,
        });

        res.status(201).json(nuevoPadre);
    } catch (error) {
        next(error);
    }
};
