var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
	id 						: { type:Number, unique:true },
	name 					: { type:String, unique:true },
	account_name			: { type:String, trim:true },
	onGameArea				: {},

	skin					: { type:String },
	deltashow				: { type:Object },
	size					: { type:Object },
	rgba					: { type:String },
	animation				: { type:Object },

	jump_speed				: { type:Number },
	move_speed				: { type:Number },
	mass					: { type:Number },

	item_slot_head			: { type:Object },
	item_slot_head2			: { type:Object },
	item_slot_chest			: { type:Object },
	item_slot_foot			: { type:Object },
	item_slot_left_hand		: { type:Object },
	item_slot_right_hand	: { type:Object },
	// titleOwned				: { type:Object },
	// titleSelected			: { type:String },
	inventory				: { type:Object },

	strengh					: { type:Number },
	endurance				: { type:Number },
	focus					: { type:Number },
	training				: { type:Number },
	willpower				: { type:Number }

	//will be calculated in game
	// position				: { type:Object },
	// velocity				: { type:Object },
	// acceleration			: { type:Object },
	// damage					: { type:Number },
	// hp						: { type:Number },
	// willRegen				: { type:Number },
	// skillBonus				: { type:Number },
	// will					: { type:Number }
}, {
	_id:true
});

module.exports =  mongoose.model('avatar', accountSchema);
