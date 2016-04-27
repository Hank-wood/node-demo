var express = require('express');
var router = express.Router();
var mongoose = require('../config/connectMongo.js');
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
    comments: String
})
var Car = mongoose.model('car', carSchema,'cars');
var Brand = mongoose.model('brand', brandSchema,'brand');
var Comments = mongoose.model('comments', commentsSchema,'comments');

router.get('/', function(req, res, next) {
    Car.find({},function(err,cars){
        if(err){
            return console.error(err);
        }
        console.log(cars)
        Brand.find({},function(err,brands){
            if(err){
                return console.error(err);
            }
            res.render('index', {
                title: '汽车目录',
                car_list: cars,
                brands: brands
            });
        })    
    })
    
});
//搜索
router.get('/search_car',function(req,res,next){
    Car.findById(req.query._id,function(err,car){
        if(err){
            return console.error(err);
        }
        res.render('car_info',{
            info: car,
            title: car.name+car.displacement
        })
    })
})
//添加评论
router.post('/add_comments',function(req,res,next){
    var comments = new Comments({
        id: req.body._id,
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
