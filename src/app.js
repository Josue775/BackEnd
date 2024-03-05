const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./confing');
// const citas = require('./modulos/clientes/rutas');
const cliente = require('./modulos/usuarios/rutas');
const error = require('./red/errors');
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
// app.use('/api/citas/', citas);
app.use('/api/cliente/', cliente);
app.use(error);

module.exports = app;
