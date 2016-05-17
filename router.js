var login = require('./routes/login');
var index = require('./routes/index');
var wb = require('./routes/weibo');
var user = require('./routes/users');
var file = require('./routes/file');
var multipart = require('connect-multiparty');
var multipartMiddle = multipart();

var multer = require('multer');
var upload = multer({ dest: './upload/img/' });
var cpUpload = upload.fields([{name: 'file', maxCount: 1}]);

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
    app.get('/wb/detail', wb.detail);
    // 文件上传
    app.post('/file/upload', cpUpload, file.upload);

}