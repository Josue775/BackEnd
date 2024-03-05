const db = require('../../DB/posgresql');
const ctrl  = require('./controlador');

module.exports = ctrl(db);
