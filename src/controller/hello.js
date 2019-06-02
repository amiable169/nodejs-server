const BusinessException = require('../exception/BusinessException');
module.exports = {
    index: {
        url: '',
        method: 'get',
        handle(req, res) {
            res.send("hello world");
        }
    },
    exception: {
        url: '/exception',
        method: 'get',
        handle(req, res, next) {
            throw new BusinessException(40000, "业务异常");
        }
    },
    dynamic: {
        url: '/test/:dynamic',
        method: 'get',
        handle(req, res) {
            res.send(req.params.dynamic);
        }
    }
};