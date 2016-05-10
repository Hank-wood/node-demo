var mysql = require('../config/connectMysql.js');
var moment = require('moment');
var async = require('async');

exports.index = function(req, res, next) {
	var data = {title: '首页'}; 
    
    res.render('index', data);
};

//文章详情
exports.articalDetail = function(req,res,next){
    var data = {title: '文章详情'}; 
    
    res.render('index', data);
}
//addComments
exports.addComments = function(req,res,next){
    
}