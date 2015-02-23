var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
	id : 			{ type:Number, unique:true },
	login : 		{ type:String, unique:true, index:true, trim:true },
	password : 		{ type:String, select:false, trim:true },
	usedBySession : { type:String, select:false }
}, {
	_id:true
});

module.exports =  mongoose.model('account', accountSchema);

