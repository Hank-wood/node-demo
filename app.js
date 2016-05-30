var express = require('express');
	path = require('path'),
	favicon = require('serve-favicon'),
	logger = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	routes = require('./router'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	redis = require('redis'),
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

io.on('connection', function(socket){
	// 消息发送者id
	var id = socket.id;
	var rooms = socket.adapter.rooms;

    socket.broadcast.emit('user-login', {user: app.locals.user})
    // 客户端发送消息
    socket.on('post-message', function(data){
        socket.broadcast.emit('get-message', {
        	user: app.locals.user,
        	msg: data
        })
    })
})

http.listen(8000);
app.listen(3000);
module.exports = app;