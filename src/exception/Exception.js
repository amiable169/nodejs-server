
class Exception extends Error{
    /**
     * 异常
     * @param status 响应码
     * @param code 错误码
     * @param msg 错误信息
     */
    constructor(status, code, msg){
        super();
        this.status = status;
        this.code = code;
        this.msg = msg;
    }
}
module.exports = Exception;