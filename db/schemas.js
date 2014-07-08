
var mongoose = require('./config').mongoose;

// MESSAGE Schema

var Message = mongoose.model('Message', mongoose.Schema(
	{texto: String}
	));


exports.schemas = {Message: Message};




