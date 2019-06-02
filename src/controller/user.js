const userModel = require('../model/user');
const BusinessException = require('../exception/BusinessException');

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
    delete: {
        url: '/:id',
        method: 'delete',
        handle(req, res){
            userModel.delete(req.params.id).then(data=>{
                res.end();
            }).catch(err=> {
                throw new BusinessException(4000, "删除失败");
            })
        }
    }
};