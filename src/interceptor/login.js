module.exports = {
    interceptor : {
        url: /^((?!login).)*$/,
        handle(req, res, next) {
            console.log("登录拦截");
            next();
        }
    }
};