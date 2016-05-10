var mysql = require('../config/connectMysql.js');
var moment = require('moment');
var async = require('async');

exports.index = function(req, res, next) {
	var data = {title: '首页'}; 
    
    res.render('index', data);
};

//文章详情
exports.detail = function(req,res,next){
    var data = {title: '文章详情'}; 
    
    res.render('index', data);
}
//添加文章
exports.add = function(req,res,next){
    var data = {title: '添加文章'};
    res.render('artical/add', data);
}
//addComments
exports.addComments = function(req,res,next){
    
}