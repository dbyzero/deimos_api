var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
	id 						: { type:Number, unique:true },
	mass					: { type:Number },
	move_speed				: { type:Number },
	jump_speed				: { type:Number },
	account_name			: { type:String, trim:true },
	mental					: { type:Number },
	magic					: { type:Number },
	hp						: { type:Number },
	strengh					: { type:Number },
	agility					: { type:Number },
	willpower				: { type:Number },
	intelligence			: { type:Number },
	focusing				: { type:Number },
	deltashow				: { type:Object },
	item_slot_head			: { type:Object },
	item_slot_chest			: { type:Object },
	item_slot_foot			: { type:Object },
	item_slot_left_hand		: { type:Object },
	item_slot_right_hand	: { type:Object },
	inventory				: { type:Object },
	titleOwned				: { type:Object },
	titleSelected			: { type:String, trim:true }
}, {
	_id:true
});

module.exports =  mongoose.model('avatar', accountSchema);