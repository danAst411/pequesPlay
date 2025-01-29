import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // Registrar el error en consola
    res.status(500).json({ message: err.message || 'Error interno del servidor' });
};