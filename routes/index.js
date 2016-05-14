var query = require('../config/connectMysql.js');
var moment = require('moment');
var async = require('async');

//首页视图
exports.index = function(req, res, next) {
	var data = {
			title: '首页'
		},
		getWbSql = 'select * from weibo order by date desc';

	query(getWbSql, function(err, result, fields) {
		if (err) {
			res.send({
				code: 0,
				msg: err
			})
		}
		for (var i = 0; i < result.length; i++) {
			result[i].date = moment(result[i].date).format('YYYY-MM-DD HH:mm:ss');
		}
		data.wb_list = result;
		res.render('index/index', data);
	})
}