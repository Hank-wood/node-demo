var login = require('./routes/login');
var index = require('./routes/index');
var artical = require('./routes/artical');
var user = require('./routes/users');

module.exports = function(app) {
    // 登录注册
    app.get('/login', login.index);
    app.post('/user/login', login.login);
    app.get('/user/logout', login.logout);
    app.post('/user/register', user.register);
    // 首页
    app.get('/', index.index);
    // 文章
    app.get('/artail/add', artical.add);
    app.get('/artail/detail', artical.detail);
    app.post('/artail/addComments', artical.addComments);
}