var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
	id :			{ type:Number, unique:true },
	name :			{ type:String, unique:true, index:true, trim:true },
	content :		{ type:Object },
	regexUrl :		{ type:String, trim:true },
	areaDomID :		{ type:String, trim:true }
}, {
	_id:true
});

module.exports =  mongoose.model('gamearea', accountSchema);