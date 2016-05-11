var query = require('../config/connectMysql.js');
    bcrypt = require('bcrypt'),
    reg = /^\s*$/,
    SALT_WORK_FACTOR = 10;
/*注册*/
exports.register = function(req, res, next) {
    var nameValid = '';
    if(!req.body || reg.test(req.body.username)){
        res.send({
            code: 0,
            msg: '用户名不能为空'
        })
    }
    if(!req.body || reg.test(req.body.password)){
        res.send({
            code: 0,
            msg: '密码不能为空'
        })
    }
    nameValid = "select * from user where name='"+req.body.name+"'";
    query(nameValid, function(err, result, fields){
        if(err){
            return next(err);
        }
        if(result.length > 0){
            return res.send({
                code: 0,
                msg: '用户名已存在'
            })
        }
        bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
            if(err)next(err);
            bcrypt.hash(req.body.password, salt, function(err, hash){
                if(err)return next(err);
                req.body.password = hash;
                query("insert into user(name,password) values('"+ req.body.name +"','"+ req.body.password +"')", function(err, rows, fields){
                    if(err){
                        return res.send({
                            code: 0,
                            msg: err
                        })
                    }
                    return res.send({
                        code: 1,
                        msg: 'success'
                    })
                })
            })
        })
    })  
}

