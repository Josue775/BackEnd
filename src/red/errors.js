const respuestas = require('./respuestas');

function errors(err, req, res, next){
    console.log('error : ', err);
    const menssage = err.menssage|| 'eror interno';
    const status= err.statusCode || 500;
    respuestas.error(req,res,menssage,status);
}

module.exports = errors;