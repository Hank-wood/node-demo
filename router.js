var login = require('./routes/login');
var index = require('./routes/index');
var wb = require('./routes/weibo');
var user = require('./routes/users');
var file = require('./routes/file');
var chat = require('./routes/chat');
var multer = require('multer');
var uploadImg = multer({ dest: './upload/img/' });
var cpUpload = uploadImg.fields([{name: 'file', maxCount: 3}]);

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
    app.post('/wb/delete', wb.delete);
    app.post('/wb/list', wb.list);
    app.get('/wb/detail', wb.detail);
    // 文件上传
    app.post('/file/upload', cpUpload, file.upload, wb.addImg);
    // 聊天室
    app.get('/chat', chat.index);

}