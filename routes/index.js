var mysql = require('../config/connectMysql.js');
var moment = require('moment');
var async = require('async');

//首页视图
exports.index = function(req, res, next) {
	var data = {title: '首页'}; 
    
    res.render('index/index', data);
}
