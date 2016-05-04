var mongoose = require('../config/connectMongo.js');
var bcrypt = require('bcrypt');
var userSchema = new mongoose.Schema({
    username: {
    	unique: true,
    	type: String
    },
    password: String
})
var User = mongoose.model('user',userSchema,'user');
/*登录*/
exports.index = function(req, res, next) {
    res.render('login',{
        title: '登录'
    });
};
/*注册*/
exports.register = function(req, res, next) {
    var reg = /^\s*$/;
    var SALT_WORK_FACTOR = 10;
    
    if(!req.body || reg.test(req.body.username)){
        res.send({
            code: 0,
            msg: '用户名不能为空'
        })
        return false;
    }
    if(!req.body || reg.test(req.body.password)){
        res.send({
            code: 0,
            msg: '密码不能为空'
        })
        return false;
    }
    bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
    	if(err)return next(err);
    	bcrypt.hash(req.body.password, salt, function(err, hash){
    		if(err)return next(err);
    		req.body.password = hash;
    		var user = new User({
    		    username: req.body.username,
    		    password: req.body.password
    		})
    		User.find({username: req.body.username},function(err, user){
    			if(err)return console.error(err);
    			if(user){
    				return console.error('username 重复')
    			}else{

    			}
    		})
			user.save(function(err){
			    if(err){
    		        res.send({
    		            code: 0,
    		            msg: err
    		        })
    		    }
    		    res.send({
    		        code: 1,
    		        msg: 'success'
    		    })
    		})
    	})
    })
    
};