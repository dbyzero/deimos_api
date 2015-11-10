var mongoose = require('mongoose');

var spherezonetemplateSchema = mongoose.Schema({
	id : { type:Number, unique:true },
	name : { type:String, unique:true, index:true, trim:true },
	description : { type:String },
	applyEffectFrequency : { type:Number },
	duration : { type:Number },
	skin : { type:String },
	color : { type:String },
	ownerId : { type:Number },
	effects : { type:Array },
  initialRadius : { type:Number },
  growSpeed : { type:Number }
}, {
	_id:true
});

module.exports =  mongoose.model('spherezonetemplate', spherezonetemplateSchema);
