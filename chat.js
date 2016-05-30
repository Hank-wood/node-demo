var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


io.on('connection', function(socket){
	var id = socket.id;
	var rooms = socket.adapter.rooms;

    socket.emit('user-login', {user: app.locals.user})
    // 客户端发送消息
    socket.on('post-message', function(data){
        socket.broadcast.emit('get-message', {
        	user: app.locals.user,
        	msg: data
        })
    })
})

http.listen(8000);