var mongoose = require('../config/connectMongo.js');
var moment = require('moment');
var async = require('async');
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
    car_id: String,
    comments: String,
    datestamp: Number
})
var Car = mongoose.model('car', carSchema,'cars');
var Brand = mongoose.model('brand', brandSchema,'brand');
var Comments = mongoose.model('comments', commentsSchema,'comments');


exports.index = function(req, res, next) {
	var data = {title: '汽车目录'}; 
    var getData = {
        Car: {
            schema: Car,
            examples: 'car_list'
        },
        Brand: {
            schema: Brand,
            examples: 'brands'
        }
    }
    async.map(getData, function(item, callback){
        item.schema.find({},function(err, res){
            callback(null, data[item.examples] = res || []);
        })
    },function(err,result){
        if(err){
            console.log(err);
        } 
        res.render('index', data);
    })

};

//汽车详情
exports.search = function(req,res,next){
	var result = {};
    Car.findById(req.query._id,function(err,car){
        if(err){
            return console.error(err);
        }
        result.title = car.name+car.displacement;
        result.info = car;
    })
    Comments.find({car_id: String(req.query._id)},function(err,comments){
        if(err){
            return console.error(err);
        }
        comments.forEach(function(item,i){
        	item.date = moment(item.datestamp).format('YYYY-MM-DD HH:mm:ss');
        })
        result.comments = comments || []; 
        res.render('car_info', result);
    })
}

//添加评论
exports.addComments = function(req,res,next){
    console.info(req)
    var comments = new Comments({
        car_id: req.body.car_id,
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
}

