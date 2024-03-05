import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './confing';
import { Pool } from 'pg';
import cliente from './modulos/usuarios/rutas';
import error from './red/errors';
const app = express();

var corsOptiosn = {
    origin:'*',
    optionsSuccessStatus:200
}
// Middleware
app.use(cors(corsOptiosn));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Corregir aquí

// Configuración 
app.set('port', config.app.port);

// Rutas
app.use('/api/citas/', citas);
app.use('/api/cliente/', cliente);
app.use(error);

module.exports = app;
