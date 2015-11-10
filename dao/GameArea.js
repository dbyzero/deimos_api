var mongoose = require('mongoose');

var gameAreaSchema = mongoose.Schema({
	id :			{ type:Number, unique:true },
	name :			{ type:String, unique:true, index:true, trim:true },
	blocks :		{ type:Object },
	width :		{ type:Number },
	height :		{ type:Number },
	regexUrl :		{ type:String, trim:true },
	areaDomID :		{ type:String, trim:true }
}, {
	_id:true
});

module.exports =  mongoose.model('gamearea', gameAreaSchema);
