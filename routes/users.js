var mysql = require('../config/connectMysql.js');

/*注册*/
exports.register = function(req, res, next) {
    /*if(!req.body || reg.test(req.body.username)){
        res.send({
            code: 0,
            msg: '用户名不能为空'
        })
        return false;
    }
    if(!req.body || reg.test(req.body.password)){
        res.send({
            code: 0,
            msg: '密码不能为空'
        })
        return false;
    }
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if(err)return next(err);
        bcrypt.hash(req.body.password, salt, function(err, hash){
            if(err)return next(err);
            req.body.password = hash;

        })
    })*/
    
}

