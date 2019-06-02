var express = require('express');
var moment = require('moment');
var bodyParser = require('body-parser');
var path = require('path');
var router = require('./src/router/index');
var app = express();
const route = express.Router();

//引入moment时间工具并写入全局变量中，为了其他模块中使用无需导入，直接moment即可
global.moment = moment;
//自动注册interceptor拦截
router(route, path.join(__dirname, 'src', 'interceptor'));
//自动映射controller路由
router(route, path.join(__dirname, 'src', 'controller'));
//设置解析application/json
app.use(bodyParser.json());
//静态资源访问
app.use('/static',  express.static(path.join('src', 'static')));
//路由写入use中间件，为了异常捕获使用
app.use(route);
//异常处理捕获
app.use((err, req, res, next)=> {
    if(err){
        if(err.status){
            res.status(err.status).json({code: err.code, msg: err.msg});
        }else {
            console.log(moment().format('YYYY-MM-DD HH:mm:ss'),"系统异常", err);
            res.status(500).json({code: 5000, msg: "系统异常"});
        }
    }
});
//全局服务异常捕获，为了处理未知异常而导致程序崩溃
process.on("uncaughtExpection",function(err){
    console.log(moment().format('YYYY-MM-DD HH:mm:ss'),"服务异常", err);
});
app.listen(8888);