var express = require('express');
//var mongoose = require('../config/connectMongo.js');

var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/car');
var carSchema = new mongoose.Schema({
    name: String
})
var Car = mongoose.model('car', carSchema);

Car.find({},function(err,cars){
    if(err){
        return console.error(err);
    }
    console.log('result:');
    console.log(cars);
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '汽车目录' });
});

module.exports = router;
