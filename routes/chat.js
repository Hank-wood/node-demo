//聊天室
exports.index = function(req, res, next) {   
    res.render('chat/index',{
        title: 'demo'
    })
}