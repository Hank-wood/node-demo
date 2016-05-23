var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./router');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var app = express();
var redis = require('redis'),
    client = redis.createClient({
    	host: 'localhost'
    });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(cookieParser());
app.use(session({
	// 每次访问服务器更新session过期时间
	rolling: true,
	// session存储方式 默认存储在内存中
	store: new RedisStore({
		host: 'localhost',
		client: client
	}),
	cookie: {
		// 过期时间24小时
		maxAge:  24*60*60*1000
	},
	resave: true,
	saveUninitialized: false,
	// 生成hash防治篡改
	secret: 'bolg'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload',express.static(path.join(__dirname, 'upload')));

app.use(function(req,res,next){
	// console.log(req.path);
	// console.log(req.session);
	if(!req.session.user && req.path != '/login' && req.path != '/user/register' && req.path != '/user/login'){
		res.redirect('/login');
	}else{
		if(req.session.user){
			app.locals.user =  req.session.user.name;
			app.locals.user_id =  req.session.user.id;
		}else{
			app.locals.user = null;
			app.locals.user_id = null;
		}
	}
	next();
})
/*********/
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(8000);

app.get('/chat', function(req, res){
    io.sockets.emit('change', {
        pageIndex: 123
    })
    res.render('chat/index')
})
io.on('connection', function(socket){
	console.log(123)
	socket.emit('news', {hello: 'world'})
	socket.on('my other event', function(data){
		console.log(data)
	})
})
/*********/
routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.listen(3000);
module.exports = app;