function error(menssage,code){
    let e = new Error(menssage);
    if(code){
        e.statusCode = code;
    }
    return 0;
}

module.exports = error;