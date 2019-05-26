module.exports = {
    interceptor : {
        url: /^((?!login).)*$/,
        handle: function (req, res, next) {
            console.log("登录拦截");
            next();
        }
    }
};