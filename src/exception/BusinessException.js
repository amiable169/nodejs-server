const Exception = require('./Exception');

class BusinessException extends Exception{
    constructor(code, msg){
        super(400, code, msg);
    }
}

module.exports = BusinessException;