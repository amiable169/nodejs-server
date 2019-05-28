var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router = require('./src/router/index');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server, {origins: '*'});
io.set("origin","");

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


io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world1' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

app.listen(8888,{origins: '*:*'});