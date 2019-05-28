var userModel = require('../model/user');

module.exports = {
    url: '/user',
    query: {
        method: 'get',
        async handle(req, res) {
            // async/await结合promise可以同步获取数据
            const data = await userModel.list();
            res.send(data);
        }
    },
    save: {
        method: 'post',
        handle(req, res) {
            console.log(req.body);
            userModel.save(req.body.username, req.body.password).then(data=>{
                console.log(data);
                res.send("保存成功");
            })
        }
    },

};