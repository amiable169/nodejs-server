var ndbcTemplate = require('./ndbcTemplate');

module.exports = {
    list() {
        return new Promise((resolve, reject)=>{
            ndbcTemplate.query("select * from user_info").then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(err);
            })
        })
    },
    save(username, password) {
        return new Promise((resolve, reject)=>{
            ndbcTemplate.insert("insert into user_info(username, password) values(?,?)", [username, password]).then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(err);
            })
        })
    },
    delete(id){
        return new Promise((resolve, reject)=>{
            ndbcTemplate.delete("delete from user_info where id=?", [id]).then(res=>{
                resolve(res);
            }).catch(err=>{
                reject(err);
            })
        })
    }
};