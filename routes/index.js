var query = require('../config/connectMysql.js');
var moment = require('moment');

//首页视图
exports.index = function(req, res, next) {
	var data = {
			title: '首页'
		},
		getWbSql = 'select weibo.*,user.name as author_name from weibo,user where weibo.author = user.id order by weibo.date desc';

	query(getWbSql, function(err, result, fields) {
		if (err) {
			res.send({
				code: 0,
				data: err
			})
		}
		for (var i = 0; i < result.length; i++) {
			result[i].date = moment(result[i].date).format('YYYY-MM-DD HH:mm:ss');
			result[i].img && (result[i].img = result[i].img.split(','));
		}
		data.wb_list = result;
		res.render('index/index', data);
	})
}