var mongoose = require('mongoose');

var effectSchema = mongoose.Schema({
	id					: { type:Number, unique:true },
	name 				: { type:String, trim:true },
  description : { type: String },

  instant     : { type: Boolean },
  frequency   : { type: Number },
  duration    : { type: Number },

  affectFriendly : { type: Boolean },
  affectEnnemies : { type: Boolean },
  affectPets   : { type: Boolean },

  damageType   : {type:String},
  damage : { type: Number },

  bonusRegenHP : { type: Number },
  bonusRegenWill : { type: Number },
  bonusHP : { type: Number },
  bonusWill : { type: Number },

  bonusStrengh : { type: Number },
  bonusEndurance : { type: Number },
  bonusWillpower : { type: Number },
  bonusFocus : { type: Number },
  bonusTraining : { type: Number },

  bonusMass : { type: Number },
  bonusSpeed : {type: Number},
  bonusArmor : {type: Number},
  bonusPercentSkillDamage : { type: Number },
  bonusPercentMeleeDamage : { type: Number },
  bonusPercentStuffStats : {type: Number},

  replySkillEffect : {type: Boolean},
  replyPercentDamage : {type: Number},
  replyDamage : {type: Number}
}, {
	_id:true
});

module.exports =  mongoose.model('effect', effectSchema);
