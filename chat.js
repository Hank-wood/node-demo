module.exports = function(app) {
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    http.listen(8000);

    app.get('/chat', function(req, res){
        res.render('chat/index');
    })
    io.on('connection', function(socket){
        socket.emit('news', {hello: 'world'})
        socket.on('my other event', function(data){
            console.log(data);
        })
    })

}