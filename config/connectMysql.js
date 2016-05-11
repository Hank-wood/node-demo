var config = require('./config');
var mysql = require('mysql');

var query = function(sql, callback){
    var connection = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    })
    connection.connect();
    connection.query(sql, function(err,result,fields){
        // 释放连接
        connection.end();
        // 事件驱动回调
        callback(err,result,fields);
    })
}


module.exports = query;
