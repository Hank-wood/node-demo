var query = require('../config/connectMysql.js');
var moment = require('moment');
var async = require('async');
var nullReg = /^\s*$/;

exports.index = function(req, res, next) {
    var data = {
            title: '首页'
        };
    res.render('index', data);
};

//文章详情
exports.detail = function(req, res, next) {
    var data = {
        title: '文章详情'
    };

    res.render('index', data);
}
//发微博
exports.add = function(req, res, next) {
    var insertSql = 'insert into weibo(content,author,adress) values("' + req.body.content + '","' + req.session.user.name + '","'+req.body.adress+'")';
    console.log(insertSql)
    if (nullReg.test(req.body.content)) {
        res.send({
            code: 0,
            msg: '微博内容不能为空'
        })
    } else {
        query(insertSql, function(err, result, fields) {
            if (err) {
                res.send({
                    code: 0,
                    msg: err
                })
            } else {
                res.send({
                    code: 1,
                    msg: 'success'
                })
            }
        })
    }
}
    //addComments
exports.addComments = function(req, res, next) {

}