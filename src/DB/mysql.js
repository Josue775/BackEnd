const mysql = require('mysql');
const config = require('../confing');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}
let conexion;
function conMysql(){
    conexion = mysql.createConnection(dbconfig);
    conexion.connect((err)=>{
        if(err){
            console.log('[db err]',err);
            setTimeout(conMysql,200);
        }else{
            console.log('db conectada');
        }
    });
    conexion.on('error', err=>{
        console.log('[db err]',err);
        if(err.code === 'PROTOCOL_CONNETION_LOST'){
            conMysql();
        }else{
            throw err;
        }
    });
}
conMysql();
function todos(tabla){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT  * FROM ${tabla}`,(error,result)=>{
            if(error) return reject(error);
            resolve(result);
        });
    });
}

function uno(tabla,id){
    return new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM citas WHERE id = ${id}`, (error,result)=>{
            if(error) return reject(error);
            resolve(result);
        });
    });
}
function buscarPorNombre(tabla, nombre) {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE nombre = '${nombre}'`, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
function agregar(tabla, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`INSERT INTO ${tabla} SET ?`, data, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
function actualizar(tabla, id, data) {
    return new Promise((resolve, reject) => {
        conexion.query(`UPDATE ${tabla} SET ? WHERE id = ${id}`, [data, id], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
function eliminar(tabla, id) {
    return new Promise((resolve, reject) => {
        conexion.query(`DELETE FROM ${tabla} WHERE id = ${id}`, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    buscarPorNombre,
    actualizar
}