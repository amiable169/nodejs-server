var mysql = require('mysql');
//采用连接池方式
var pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'test',
    charset: 'UTF8'   //字符编码需大写
});
module.exports = {
    /**
     * 查询，返回数组
     * @param sql
     * @param params
     * @returns {Promise}
     */
    query(sql, params) {
        if (!params) {
            params = [];
        }
        return new Promise((resolve, reject)=> {
            pool.getConnection((err, connection)=> {
                connection.query(sql, params, (err, results)=> {
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
    queryForObject(sql, params) {
        const that = this;
        return new Promise((resolve, reject)=> {
            that.query(sql, params).then(res=>{
                if (res.length == 0) {
                    resolve(null);
                } else if (res.length == 1) {
                    resolve(res[0]);
                } else {
                    reject("incorrect result size: expected 1, actual " + res.length);
                }
            }).catch(reason=> {
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
    insert(sql, params) {
        const that = this;
        return new Promise((resolve, reject)=> {
            that.query(sql, params).then(res=> {
                resolve(res);
            }).catch(reason=> {
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
    update(sql, params) {
        const that = this;
        return new Promise((resolve, reject)=> {
            that.query(sql, params).then(res=> {
                resolve(res);
            }).catch(reason=> {
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
    delete(sql, params) {
        const that = this;
        return new Promise((resolve, reject)=> {
            that.query(sql, params).then(res=> {
                resolve(res);
            }).catch(reason=> {
                reject(reason);
            })
        });
    }
};