
class Exception{
    /**
     * 异常
     * @param status 响应码
     * @param code 错误码
     * @param msg 错误信息
     */
    constructor(status, code, msg){
        global.res.status(status).json({code, msg});
    }
}
module.exports = Exception;