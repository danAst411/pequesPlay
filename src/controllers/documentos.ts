import { Request, Response, NextFunction } from 'express';
import Documentos from '../models/documento'; // Asegúrate de que la ruta sea correcta

// Obtener todos los documentos
export const getDocumentos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const documentos = await Documentos.findAll();
        res.json(documentos);
    } catch (error) {
        next(error);
    }
};

// Obtener un documento por ID
export const getDocumento = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const documento = await Documentos.findByPk(id);
        if (!documento) {
            res.status(404).json({ message: `No se encontró un documento con el ID ${id}` });
            return;
        }
        res.json(documento);
    } catch (error) {
        next(error);
    }
};

// Crear un nuevo documento
export const postDocumento = async (req: Request, res: Response, next: NextFunction) => {
    const { inscripcion_id, tipo_documento, url_documento } = req.body;

    try {
        const nuevoDocumento = await Documentos.create({
            inscripcion_id,
            tipo_documento,
            url_documento,
        });

        res.status(201).json(nuevoDocumento);
    } catch (error) {
        next(error);
    }
};

// Actualizar un documento existente
export const putDocumento = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { inscripcion_id, tipo_documento, url_documento } = req.body;

    try {
        const documento = await Documentos.findByPk(id);
        if (!documento) {
            res.status(404).json({ message: `No se encontró un documento con el ID ${id}` });
            return;
        }

        await documento.update({
            inscripcion_id,
            tipo_documento,
            url_documento,
        });

        res.json(documento);
    } catch (error) {
        next(error);
    }
};

// Eliminar un documento
export const deleteDocumento = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const documento = await Documentos.findByPk(id);
        if (!documento) {
            res.status(404).json({ message: `No se encontró un documento con el ID ${id}` });
            return;
        }

        await documento.destroy();
        res.json({ message: `El documento con ID ${id} fue eliminado correctamente` });
    } catch (error) {
        next(error);
    }
};
