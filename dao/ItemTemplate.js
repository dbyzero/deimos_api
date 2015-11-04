var mongoose = require('mongoose');

var itemTemplateSchema = mongoose.Schema({
	id					: { type:Number, unique:true },
	name 				: { type:String, trim:true },
	skin				: { type:String, trim:true },
	slot 				: { type:String, trim:true },
	skills			: { type:Array }
}, {
	_id:true
});

module.exports =  mongoose.model('itemtemplate', itemTemplateSchema);
