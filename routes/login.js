var mongoose = require('../config/connectMongo.js');

var userSchema = new mongoose.Schema({
    username: String,
    password: String
})
var User = mongoose.model('user',userSchema,'user');
/*登录*/
exports.index = function(req, res, next) {
    res.render('login',{
        title: '登录'
    });
};
/*注册*/
exports.register = function(req, res, next) {
    var reg = /^\s*$/;
    var user = new User({
        username: req.body.username,
        password: req.body.password
    })
    if(!req.body || reg.test(req.body.username)){
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
    user.save(function(err){
        if(err){
            res.send({
                code: 0,
                msg: err
            })
        }
        res.send({
            code: 1,
            msg: 'success'
        })
    })
};