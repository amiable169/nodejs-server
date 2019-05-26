var mysql = require('mysql');
var mysqlConfig = {
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'test',
    charset: 'UTF8'   //字符编码需大写
};
module.exports = {
    _pool: null,
    /**
     * 查询，返回数组
     * @param sql
     * @param params
     * @returns {Promise}
     */
    query: function (sql, params) {
        const that = this;
        this._pool = mysql.createPool(mysqlConfig);
        if (!params) {
            params = [];
        }
        return new Promise(function (resolve, reject) {
            that._pool.getConnection(function (err, connection) {
                connection.query(sql, params, function (err, results) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
                connection.release();
            })
        })
    },
    /**
     * 查询，返回对象
     * @param sql
     * @param params
     * @returns {Promise}
     */
    queryForObject: function (sql, params) {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.query(sql, params).then(function (res) {
                if (res.length == 0) {
                    resolve(null);
                } else if (res.length == 1) {
                    resolve(res[0]);
                } else {
                    reject("incorrect result size: expected 1, actual " + res.length);
                }
            }).catch(function (reason) {
                reject(reason);
            })
        });
    },
    /**
     * 插入
     * @param sql
     * @param params
     * @returns {Promise}
     */
    insert: function (sql, params) {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.query(sql, params).then(function (res) {
                resolve(res);
            }).catch(function (reason) {
                reject(reason);
            })
        });
    },
    /**
     * 更新
     * @param sql
     * @param params
     * @returns {Promise}
     */
    update: function (sql, params) {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.query(sql, params).then(function (res) {
                resolve(res);
            }).catch(function (reason) {
                reject(reason);
            })
        });
    },
    /**
     * 删除
     * @param sql
     * @param params
     * @returns {Promise}
     */
    delete: function (sql, params) {
        const that = this;
        return new Promise(function (resolve, reject) {
            that.query(sql, params).then(function (res) {
                resolve(res);
            }).catch(function (reason) {
                reject(reason);
            })
        });
    }
};