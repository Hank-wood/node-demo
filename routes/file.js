exports.upload = function(req, res, next) {
    console.log(req.files)
    if(req.files){
        res.send({
            code: 1
        })
    }else{
        res.send({
            code: 0
        })
    }    
};
