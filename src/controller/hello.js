const BusinessException = require('../exception/BusinessException');
module.exports = {
    index: {
        url: '',
        method: 'get',
        handle: function (req, res) {
            res.send("hello world");
        }
    },
    exception: {
        url: '/exception',
        method: 'get',
        handle: function (req, res) {
            throw new BusinessException(40000, "业务异常");
        }
    },
    dynamic: {
        url: '/test/:dynamic',
        method: 'get',
        handle: function (req, res) {
            res.send(req.params.dynamic);
        }
    }
};