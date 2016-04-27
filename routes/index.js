var express = require('express');
var router = express.Router();
var mongoose = require('../config/connectMongo.js');
var moment = require('moment');
var carSchema = new mongoose.Schema({
    name: String,
    price: Number,
    displacement: String
})
var brandSchema = new mongoose.Schema({
    name: String,
    id: Number
})
var commentsSchema = new mongoose.Schema({
    id: Number,
    comments: String,
    datestamp: Number
})
var Car = mongoose.model('car', carSchema,'cars');
var Brand = mongoose.model('brand', brandSchema,'brand');
var Comments = mongoose.model('comments', commentsSchema,'comments');

router.get('/', function(req, res, next) {
	var result = {title: '汽车目录'};
    Car.find({},function(err,cars){
        if(err){
            return console.error(err);
        }
        result.car_list = cars || [];   
    })
    Brand.find({},function(err,brands){
        if(err){
            return console.error(err);
        }
        result.brands = brands || [];  
        res.render('index', result);
    })

});
//搜索
router.get('/search_car',function(req,res,next){
	var result = {};
    Car.findById(req.query._id,function(err,car){
        if(err){
            return console.error(err);
        }
        result.title = car.name+car.displacement;
        result.info = car;
    })
    Comments.find({},function(err,comments){
        if(err){
            return console.error(err);
        }
        comments.forEach(function(item,i){
        	item.date = moment(item.datestamp).format('YYYY-MM-DD HH:mm:ss');
        })
        result.comments = comments || []; 
        res.render('car_info', result);
    })
})
//添加评论
router.post('/add_comments',function(req,res,next){
    var comments = new Comments({
        id: req.body._id,
        datestamp: Date.now(),
        comments: req.body.comments
    })
    comments.save(function(err){
        if(err){
            res.send({
                code: 0,
                msg: '添加评论失败'
            })
        }
        res.send({
            code: 1,
            msg: 'success'
        })
    });
})
//获取评论
router.post('/get_comments',function(req,res,next){
    Comments.find({},function(err,comments){
        if(err){
            res.send({
                code: 0,
                comments: '查询评论失败'
            })
        }
        res.send({
            code: 1,
            comments: comments
        })
    })
})
module.exports = router;
