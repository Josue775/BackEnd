const TABLA = 'citas';

module.exports= function(dbInyectada){

    let db = dbInyectada;
    if (!db){
        db  = require('../../DB/mysql');
    }
    function todos(){
        return db.todos(TABLA);
    }
    function uno(id){
        return db.uno(TABLA,id);
    }
    function buscarPorNombre(nombre) {
        return db.buscarPorNombre(TABLA, nombre);
    }
    function agregar(data) {
        return db.agregar(TABLA, data);
    }
    function actualizar(id, data) {
        return db.actualizar(TABLA, id, data);
    }
    function eliminar(id) {
        return db.eliminar(TABLA, id);
    }
    return{
        todos,
        uno,
        buscarPorNombre,
        agregar,
        actualizar,
        eliminar,
    }    
    
}