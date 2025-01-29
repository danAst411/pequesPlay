"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const padres_1 = __importDefault(require("../routes/padres"));
const servicios_1 = __importDefault(require("../routes/servicios"));
const autorizados_1 = __importDefault(require("../routes/autorizados"));
const datos_medicos_1 = __importDefault(require("../routes/datos_medicos"));
const inscripciones_1 = __importDefault(require("../routes/inscripciones"));
const documentos_1 = __importDefault(require("../routes/documentos"));
const errorHandler_1 = require("../middleware/errorHandler");
const connection_1 = __importDefault(require("../db/connection"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.middlewares();
        this.routes();
        this.listen();
        this.dbConnect();
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(errorHandler_1.errorHandler);
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.send('Api working');
        });
        this.app.use('/api/padres', padres_1.default);
        this.app.use('/api/servicios', servicios_1.default);
        this.app.use('/api/autorizados', autorizados_1.default);
        this.app.use('/api/datos_medicos', datos_medicos_1.default);
        this.app.use('/api/inscripciones', inscripciones_1.default);
        this.app.use('/api/documentos', documentos_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection_1.default.authenticate().then(() => console.log('Conexión a la base de datos establecida correctamente'))
                .catch((error) => console.log('Error al conectar a la base de datos:'));
        });
    }
}
exports.default = Server;
