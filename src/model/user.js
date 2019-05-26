var ndbcTemplate = require('./ndbcTemplate');

module.exports = {
    list: function () {
        return new Promise(function (resolve, reject) {
            ndbcTemplate.query("select * from user_info").then(function (res) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            })
        })
    },
    save: function (username, password) {
        return new Promise(function (resolve, reject) {
            ndbcTemplate.insert("insert into user_info(username, password) values(?,?)", [username, password]).then(function (res) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            })
        })
    }
};