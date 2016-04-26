var express = require('express');
//var mongoose = require('../config/connectMongo.js');

var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/car');
var carSchema = new mongoose.Schema({
    name: String
})
var Car = mongoose.model('car', carSchema);
/*var bmw = new Car({
    name: '奥迪A4'
})
bmw.save(function(err){
    if(err){
        return console.error('保存失败');
    }else{
        return console.log('保存成功');
    }
})*/

/* GET home page. */
router.get('/', function(req, res, next) {
    Car.find({},function(err,cars){
        if(err){
            return console.error(err);
        }
        res.render('index', {
            title: '汽车目录',
            car_list: cars
        });
    })
    
});

module.exports = router;
