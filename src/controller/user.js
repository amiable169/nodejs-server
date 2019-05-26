var userModel = require('../model/user');

module.exports = {
    query: {
        url: '/user',
        method: 'get',
        handle: function (req, res) {
            userModel.list().then(function (data) {
                res.json(data);
            })
        }
    },
    save: {
        url: '/user',
        method: 'post',
        handle: function (req, res) {
            console.log(req.body);
            userModel.save(req.body.username, req.body.password).then(function (data) {
                console.log(data);
                res.send("保存成功");
            })
        }
    }
};