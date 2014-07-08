
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/skeletor');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log('multivision db opened');
});

exports.mongoose = mongoose;
