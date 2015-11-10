var Route_Abstract		= require('./Abstract.js');
var DAO_Effect	= require('../dao/Effect.js');
var inherit				= require('../utils/inherit.js');

var Route_Effect = function(){
	this.dao = DAO_Effect;
	this.collection = 'effect';
	this.uniqueField = 'id';
};
inherit(Route_Effect,Route_Abstract);

Route_Effect.prototype.addRoute = function(server) {
	Route_Effect._super.prototype.addRoute.call(this,server);
	server.post('/'+this.collection+'/create/:name', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		DAO_Effect.findOne({name:req.params.name}).exec()
			.then(function(result){
				if(result !== null) {
					res.send(401,{'error':'Effect_exist'});
					return next();
				}
				DAO_Effect.findOne({},{id:true},{sort:{id: -1}}).exec()
					.then(function(result) {
						var Effect = new DAO_Effect();
						if(result === null) {
							Effect.id = 1;
						} else {
							Effect.id = (result.id + 1);
						}
						Effect.name = req.params.name;
						Effect.description = req.params.description;
						Effect.instant = req.params.instant;
						Effect.frequency = req.params.frequency;
						Effect.duration = req.params.duration;
						Effect.affectFriendly = req.params.affectFriendly;
						Effect.affectEnnemies = req.params.affectEnnemies;
						Effect.affectPets = req.params.affectPets;
						Effect.damageType = req.params.damageType;
						Effect.damage = req.params.bonusDamage;
						Effect.bonusRegenHP = req.params.bonusRegenHP;
						Effect.bonusRegenWill = req.params.bonusRegenWill;
						Effect.bonusHP = req.params.bonusHP;
						Effect.bonusWill = req.params.bonusWill;
						Effect.bonusStrengh = req.params.bonusStrengh;
						Effect.bonusEndurance = req.params.bonusEndurance;
						Effect.bonusWillpower = req.params.bonusWillpower;
						Effect.bonusFocus = req.params.bonusFocus;
						Effect.bonusTraining = req.params.bonusTraining;
						Effect.bonusMass = req.params.bonusMass;
						Effect.bonusSpeed = req.params.bonusSpeed;
						Effect.bonusArmor = req.params.bonusArmor;
						Effect.bonusPercentSkillDamage = req.params.bonusPercentSkillDamage;
						Effect.bonusPercentMeleeDamage = req.params.bonusPercentMeleeDamage;
						Effect.bonusPercentStuffStats = req.params.bonusPercentStuffStats;
						Effect.replySkillEffect = req.params.replySkillEffect;
						Effect.replyPercentDamage = req.params.replyPercentDamage;
						Effect.replyDamage = req.params.replyDamage;
						Effect.save(function(err, result, numberAffected){
							if(err) throw err;
							console.log('Add ' + numberAffected + ' Effect');
							res.send(200,result);
							return next();
						});
					},function(err){
						throw err;
					});
			},function(err){
				throw err;
			});
	}.bind(this));


	server.post('/'+this.collection+'/update/:id', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		this.dao.findOne({'id':req.params.id}).exec()
			.then(
				function(Effect){
					if(Effect === null) {
						res.send(404);
						return next();
					} else {
            Effect.name = req.params.name;
            Effect.description = req.params.description;
            Effect.instant = req.params.instant;
            Effect.frequency = req.params.frequency;
            Effect.duration = req.params.duration;
            Effect.affectFriendly = req.params.affectFriendly;
            Effect.affectEnnemies = req.params.affectEnnemies;
            Effect.affectPets = req.params.affectPets;
            Effect.damageType = req.params.damageType;
            Effect.damage = req.params.damage;
            Effect.bonusRegenHP = req.params.bonusRegenHP;
            Effect.bonusRegenWill = req.params.bonusRegenWill;
            Effect.bonusHP = req.params.bonusHP;
            Effect.bonusWill = req.params.bonusWill;
            Effect.bonusStrengh = req.params.bonusStrengh;
            Effect.bonusEndurance = req.params.bonusEndurance;
            Effect.bonusWillpower = req.params.bonusWillpower;
            Effect.bonusFocus = req.params.bonusFocus;
            Effect.bonusTraining = req.params.bonusTraining;
            Effect.bonusMass = req.params.bonusMass;
            Effect.bonusSpeed = req.params.bonusSpeed;
            Effect.bonusArmor = req.params.bonusArmor;
            Effect.bonusPercentSkillDamage = req.params.bonusPercentSkillDamage;
            Effect.bonusPercentMeleeDamage = req.params.bonusPercentMeleeDamage;
            Effect.bonusPercentStuffStats = req.params.bonusPercentStuffStats;
            Effect.replySkillEffect = req.params.replySkillEffect;
            Effect.replyPercentDamage = req.params.replyPercentDamage;
            Effect.replyDamage = req.params.replyDamage;
						Effect.save(function(err, result, numberAffected){
							if(err) next(err);
							res.send(200, Effect);
							return next();
						});
					}
				},
				function(err){
					next(err);
				}
			).end(function() {
				res.end();
				return next();
			});
	}.bind(this));
}

module.exports = Route_Effect;
