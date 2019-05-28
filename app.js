var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = require('./src/router/index');
var app = express();

//设置允许跨域访问该服务.
app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:9527');
    res.header('Access-Control-Allow-Headers', 'X-Token, Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials','true');   // 新增
    if (req.method == 'OPTIONS') {
        res.send(200); /*让options请求快速返回*/
    }
    else {
        next();
    }
});
//自动注册interceptor拦截
router(app, path.join(__dirname, 'src', 'interceptor'));
//自动映射controller路由
router(app, path.join(__dirname, 'src', 'controller'));
//设置解析application/json
app.use(bodyParser.json());
//静态资源访问
app.use('/static',  express.static(path.join('src', 'static')));
//异常处理
app.use((req, res, next)=> {
    global.res = res;
    next();
});

var server = app.listen(8888);
var io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
    //发送消息(所有用户)
    socket.broadcast.emit('message',{text: '你的好某XXX上线了'});
    //发送消息(单个用户)
    socket.emit('message',{text:'你上线了'});
    //断开连接
    socket.on('disconnect',function(){
        console.log('User disconnected');
    });
});
