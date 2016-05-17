var query = require('../config/connectMysql.js');
    bcrypt = require('bcrypt'),
    redis = require('redis'),
    client = null,
    reg = /^\s*$/,
    SALT_WORK_FACTOR = 10,
    nameValid = '';
/*注册*/
exports.register = function(req, res, next) {
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
/*登录*/
exports.login = function(req, res, next) {
    if(reg.test(req.body.username)){
        res.send({
            code: 0,
            msg: '用户名不能为空'
        })
    }
    if(reg.test(req.body.password)){
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
        if(result.length < 0){
            return res.send({
                code: 0,
                msg: '用户名不存在'
            })
        }
        bcrypt.compare(req.body.password, result[0].password, function(err, isMatch){
            if(isMatch){
                req.session.user = result[0];
                res.send({
                    code: 1,
                    msg: 'success'
                })
            }else{
                res.send({
                    code: 0,
                    msg: err
                })
            }
        })
    })
};
exports.logout = function(req,res){
    delete req.session.user;
    res.redirect('/login');
}
