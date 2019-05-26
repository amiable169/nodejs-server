var fs = require("fs");
var path = require('path');

/**
 * 判断文件是否是js文件
 * @param file
 */
function isJSFile(file) {
    file += "";
    var reg = /([\s\S]*.js)$/;
    return reg.test(file);
}

/**
 * 校验规则
 * @param obj
 */
function checkRegular(obj, file, key) {
    if (!obj.url && "" != obj.url) {
        throw new Error("文件：" + file + "   方法：" + key + "url字段不存在");
    }

    if (!obj.handle) {
        throw new Error("文件：" + file + "   方法：" + key + "handle字段不存在");
    } else {
        if (!(obj.handle instanceof Function)) {
            throw new Error("文件：" + file + "   方法：" + key + "原因：handle不是函数");
        }
    }
}

/**
 * 根据controller文件，生成路由
 * @param app
 * @param file
 */
function createRoute(app, file) {
    if (!isJSFile(file)) {
        return;
    }
    var instance = require(file);
    console.log("控制器", instance);
    for (let key in  instance) {
        var obj = instance[key];
        checkRegular(obj, file, key);
        switch (obj.method.toLowerCase()) {
            case 'get':
                app.get(obj.url, obj.handle);
                break;
            case 'post':
                app.post(obj.url, obj.handle);
                break;
            case 'put':
                app.put(obj.url, obj.handle);
                break;
            case 'patch':
                app.patch(obj.url, obj.handle);
                break;
            case 'delete':
                app.delete(obj.url, obj.handle);
                break;
            default:
                app.all(obj.url, obj.handle);
        }
    }
}

/**
 * 根据interceptor文件，生成拦截
 */
function createInterceptor(app, file) {
    if (!isJSFile(file)) {
        return;
    }
    var instance = require(file);
    console.log("拦截器", instance);
    for (let key in  instance) {
        var obj = instance[key];
        checkRegular(obj, file, key);
        app.use(obj.url, obj.handle);
    }
}

/**
 * 读取目录下的所有文件
 * @param app
 * @param route
 */
function readDirectoryFiles(app, route) {
    fs.readdir(route, function (err, files) {
        for (let i in files) {
            fileType(app, path.join(route, files[i]));
        }
    })
}

/**
 * 判断文件类型
 * @param app
 * @param route
 */
function fileType(app, route) {
    fs.stat(route, function (err, stats) {
        if (err) {
            throw new Error(err)
        }
        if (stats.isFile()) {
            if(route.indexOf('interceptor') != -1){
                createInterceptor(app, route);
            }else{
                createRoute(app, route);
            }
        } else if (stats.isDirectory()) {
            readDirectoryFiles(app, route);
        } else {
            throw new Error("unknown file type")
        }
    })
}

module.exports = function (app, route) {
    fileType(app, route);
};