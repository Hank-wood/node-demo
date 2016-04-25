var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect('mongodb://'+config.host+'/car',function(err){
    if(err){
        return console.error(err);
    }
});

module.exports = mongoose;
