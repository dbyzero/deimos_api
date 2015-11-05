var Route_Abstract		= require('./Abstract.js');
var DAO_Skill	= require('../dao/Skill.js');
var inherit				= require('../utils/inherit.js');

var Route_Skill = function(){
	this.dao = DAO_Skill;
	this.collection = 'skill';
	this.uniqueField = 'id';
};
inherit(Route_Skill,Route_Abstract);

Route_Skill.prototype.addRoute = function(server) {
	Route_Skill._super.prototype.addRoute.call(this,server);
	server.post('/'+this.collection+'/create/:name', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		DAO_Skill.findOne({name:req.params.name}).exec()
			.then(function(result){
				if(result !== null) {
					res.send(401,{'error':'Skill_exist'});
					return next();
				}
				DAO_Skill.findOne({},{id:true},{sort:{id: -1}}).exec()
					.then(function(result) {
						var Skill = new DAO_Skill();
						if(result === null) {
							Skill.id = 1;
						} else {
							Skill.id = (result.id + 1);
						}
						Skill.name = req.params.name;
						Skill.description = req.params.description;
						Skill.icon = req.params.icon;
						Skill.replaceAttack = req.params.replaceAttack;
						Skill.passiveEffect = req.params.passiveEffect;
						Skill.onActivate = req.params.onActivate;
						Skill.save(function(err, result, numberAffected){
							if(err) throw err;
							console.log('Add ' + numberAffected + ' Skill');
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
				function(Skill){
					if(Skill === null) {
						res.send(404);
						return next();
					} else {
            Skill.name = req.params.name;
            Skill.description = req.params.description;
            Skill.icon = req.params.icon;
						Skill.replaceAttack = req.params.replaceAttack;
						Skill.passiveEffect = req.params.passiveEffect;
						Skill.onActivate = req.params.onActivate;
						Skill.save(function(err, result, numberAffected){
							if(err) next(err);
							res.send(200, Skill);
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

module.exports = Route_Skill;
