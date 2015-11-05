var mongoose = require('mongoose');

var skillSchema = mongoose.Schema({
	id					: { type:Number, unique:true },
	name 				: { type:String, trim:true },
  description : { type: String },
  icon :        { type: String },
  replaceAttack : { type: Boolean },
  passiveEffect : { type: Array },
  onActivate :  { type: Array }
}, {
	_id:true
});

module.exports =  mongoose.model('skill', skillSchema);
