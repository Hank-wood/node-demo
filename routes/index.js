var express = require('express');
var router = express.Router();
var mongoose = require('../config/connectMongo.js');
var carSchema = new mongoose.Schema({
    name: String
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
        Brand.find({},function(err,brands){
            if(err){
                return console.error(err);
            }
            console.log(brands)
            res.render('index', {
                title: '汽车目录',
                car_list: cars,
                brands: brands
            });
        })    
    })
    
});

module.exports = router;
