import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import padresRoutes from '../routes/padres';
import serviciosRoutes from '../routes/servicios';
import autorizadosRoutes from '../routes/autorizados';
import datosMedicosRoutes from '../routes/datos_medicos';
import inscripcionesRoutes from '../routes/inscripciones';
import documentosRoutes from '../routes/documentos';
import { errorHandler } from '../middleware/errorHandler';

import db from '../db/connection';

dotenv.config();

class Server {
    private app: express.Application;
    private port: string;

    constructor() {
       
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.routes();
        this.listen();
        this.dbConnect();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(errorHandler);
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('Api working');
        });
       this.app.use('/api/padres', padresRoutes);
       this.app.use('/api/servicios', serviciosRoutes);
       this.app.use('/api/autorizados', autorizadosRoutes);
       this.app.use('/api/datos_medicos', datosMedicosRoutes);
       this.app.use('/api/inscripciones', inscripcionesRoutes);
       this.app.use('/api/documentos', documentosRoutes);

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }


    async dbConnect() {
       await db.authenticate().then(()=> console.log('Conexión a la base de datos establecida correctamente'))
      .catch((error: any) => console.log('Error al conectar a la base de datos:',));
    }
}

export default Server;