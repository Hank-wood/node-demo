var car = require('./routes/car');
var login = require('./routes/login');

module.exports = function(app){
    app.get('/login',login.index);
    app.post('/register',login.register);
    app.post('/signin',login.signin);
    app.get('/',car.index);
    app.get('/search',car.search);
    app.post('/addComments',car.addComments);
}