var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
	id : 			{ type:String, unique:true },
	ip : 			{ type:String },
	account : 		{ type:String, trim:true },
	avatar : 		{ type:String, trim:true }
}, {
	_id:true
});

module.exports =  mongoose.model('session', sessionSchema);

