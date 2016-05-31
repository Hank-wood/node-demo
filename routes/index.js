var query = require('../config/connectMysql.js');

//首页视图
exports.index = function(req, res, next) {
	res.render('index/index');
}
