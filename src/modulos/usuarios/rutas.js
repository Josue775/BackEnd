const express = require('express');
const respuestass = require('../../red/respuestas');
const router = express.Router();
const controlador = require('./index');

// Manejador de solicitud para obtener todos los elementos
async function obtenerTodos(req, res) {
    try {
        const items = await controlador.todos();
        respuestass.success(req, res, items, 200);
    } catch (err) {
        respuestass.error(req, res, err, 500);
    }
}

// Manejador de solicitud para obtener un elemento por su ID
async function obtenerPorId(req, res) {
    try {
        const items = await controlador.uno(req.params.id);
        respuestass.success(req, res, items, 200);
    } catch (err) {
        respuestass.error(req, res, err, 500);
    }
}

// Manejador de solicitud para buscar por nombre
async function buscarPorNombre(req, res) {
    try {
        const items = await controlador.buscarPorNombre(req.params.nombre);
        respuestass.success(req, res, items, 200);
    } catch (err) {
        respuestass.error(req, res, err, 500);
    }
}
// Manejador de solicitud para agregar un nuevo elemento
async function agregar(req, res) {
    try {
        const nuevoItem = req.body; // Los datos para agregar deben estar en el cuerpo de la solicitud
        await controlador.agregar(nuevoItem);
        respuestass.success(req, res, 'Elemento agregado correctamente', 200);
    } catch (err) {
        respuestass.error(req, res, err, 500);
    }
}
async function actualizarPorId(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        await controlador.actualizar(id, data);
        respuestass.success(req, res, 'Elemento actualizado correctamente', 200);
    } catch (err) {
        respuestass.error(req, res, err, 500);
    }
}

async function eliminarPorId(req, res) {
    try {
        const id = req.params.id;
        await controlador.eliminar(id);
        respuestass.success(req, res, 'Elemento eliminado correctamente', 200);
    } catch (err) {
        respuestass.error(req, res, err, 500);
    }
}

// Rutas
router.delete('/delete/:id', eliminarPorId);
router.get('/', obtenerTodos);
router.get('/:id', obtenerPorId);
router.get('/nombre/:nombre', buscarPorNombre);
router.post('/agregar/', agregar);
router.put('/actulizar/:id', actualizarPorId);
module.exports = router;
