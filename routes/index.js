var express = require('express');
var router = express.Router();
var mongoose = require('../config/connectMongo.js');
var carSchema = new mongoose.Schema({
    name: String,
    price: Number
})
var brandSchema = new mongoose.Schema({
    name: String,
    id: Number
})
var Car = mongoose.model('car', carSchema,'cars');
var Brand = mongoose.model('brand', brandSchema,'brand');

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
var ObjectId = mongoose.ObjectId;
router.get('/search_car',function(req,res,next){
	console.log(req.query._id)
	Car.findById(req.query._id,function(err,car){
		if(err){
			return console.error(err);
		}
		console.log('结果：')
		console.log(car)
		res.render('car_info',{
			info: car
		})
	})
})
module.exports = router;
