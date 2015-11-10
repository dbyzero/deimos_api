var mongoose = require('mongoose');

var rectanglezonetemplateSchema = mongoose.Schema({
	id : { type:Number, unique:true },
	name : { type:String, unique:true, index:true, trim:true },
	description : { type:String },
	applyEffectFrequency : { type:Number },
	duration : { type:Number },
	skin : { type:String },
	color : { type:String },
	width : { type:Number },
	height : { type:Number },
	effects : { type:Array },
	isSolid : { type:Boolean }
}, {
	_id:true
});

module.exports =  mongoose.model('rectanglezonetemplate', rectanglezonetemplateSchema);
