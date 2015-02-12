var mongoose = require('mongoose');

var itemTemplateSchema = mongoose.Schema({
	id					: { type:Number, unique:true },
	name 				: { type:String, trim:true },
	kind 				: { type:String, trim:true },
	size				: { type:Object },
	skin				: { type:String, trim:true },
	attack				: { type:Object },
	deltashow			: { type:Object },
	damage				: { type:Number },
	mass				: { type:Number }
}, {
	_id:true
});

module.exports =  mongoose.model('itemtemplate', itemTemplateSchema);