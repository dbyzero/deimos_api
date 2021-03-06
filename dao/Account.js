var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
	id : 			{ type:Number, unique:true },
	login : 		{ type:String, unique:true, index:true, trim:true },
	password : 		{ type:String, trim:true },
	usedBySession : { type:String },
	mail : 			{ type:String }
}, {
	_id:true
});

module.exports =  mongoose.model('account', accountSchema);
