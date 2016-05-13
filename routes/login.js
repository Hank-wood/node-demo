var mysql = require('../config/connectMysql.js');

/*登录页面*/
exports.index = function(req, res, next) {
    res.render('login/login',{
        title: '登录'
    });
}

