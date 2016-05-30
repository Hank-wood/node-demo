define([
    'js/common/socket.io',
    'js/common/template'
], function(io, template){
    var socket = io.connect('http://localhost:8000');
        msgValid = /^\s*$/,
        room = $('.chat-room'),
        userName = $('.username').html();

    socket.on('user-login', function (data) {
        room.append(template('login-msg-tpl',data))
    });
    socket.on('get-message', function (data) {
        room.append(template('msg-tpl',data))
    });
    send.onclick = function(){
        if(msgValid.test(message.value)){
            alert('不能发送空消息');
            return false;
        }
        socket.emit('post-message', message.value);
        room.append(template('msg-tpl',{
            self: true,
            user: userName,
            msg: message.value
        }))
        message.value = '';
    }
})