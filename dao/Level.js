var mongoose = require('mongoose');

var levelSchema = mongoose.Schema({
	name: 	{ type:String, unique:true },
	blocks: { type:Object },
	width: 	{ type:Number },
	height: { type:Number }
}, {
	_id:true
});

module.exports =  mongoose.model('level', levelSchema);

