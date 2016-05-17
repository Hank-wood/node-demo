exports.upload = function(req, res, next) {
    if(req.files){
        next();
    }else{
        res.send({
            code: 0
        })
    }    
};
