var login = require('./routes/login');
var index = require('./routes/index');
var wb = require('./routes/weibo');
var user = require('./routes/users');

module.exports = function(app) {
    // 登录注册
    app.get('/login', login.index);
    app.post('/user/login', user.login);
    app.get('/user/logout', user.logout);
    app.post('/user/register', user.register);
    // 首页
    app.get('/', index.index);
    // 文章
    app.post('/wb/add', wb.add);
    app.get('/wb/detail', wb.detail);
    app.post('/wb/addComments', wb.addComments);
}