var mysql = require('../config/connectMysql.js');

/*登录页面*/
exports.index = function(req, res, next) {
    res.render('login/login',{
        title: '登录'
    });
};

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
};
exports.logout = function(req,res){
	delete req.session.user;
	res.redirect('/login');
}