var Route_Abstract		= require('./Abstract.js');
var DAO_SphereZoneTemplate		= require('../dao/SphereZoneTemplate.js');
var inherit				= require('../utils/inherit.js');

var Route_SphereZoneTemplate = function(){
	this.dao = DAO_SphereZoneTemplate;
	this.collection = 'spherezonetemplate';
	this.uniqueField = 'id';
};
inherit(Route_SphereZoneTemplate,Route_Abstract);

Route_SphereZoneTemplate.prototype.addRoute = function(server) {
	Route_SphereZoneTemplate._super.prototype.addRoute.call(this,server);

	server.post('/'+this.collection+'/update/:id', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		this.dao.findOne({'id':req.params.id}).exec()
			.then(
				function(spherezonetemplate){
					if(spherezonetemplate === null) {
						res.send(404);
						return next();
					} else {
						spherezonetemplate.name = req.params.name;
						spherezonetemplate.description = req.params.description;
						spherezonetemplate.applyEffectFrequency = req.params.applyEffectFrequency;
						spherezonetemplate.effects = req.params.effects;
						spherezonetemplate.duration = req.params.duration;
						spherezonetemplate.skin = req.params.skin;
						spherezonetemplate.color = req.params.color;
						spherezonetemplate.initialRadius = req.params.initialRadius;
						spherezonetemplate.growSpeed = req.params.growSpeed;
						spherezonetemplate.save(function(err, result, numberAffected){
							if(err) next(err);
							res.send(200, spherezonetemplate);
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

	server.post('/'+this.collection+'/create/:name', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		this.dao.findOne({name:req.params.name}).exec()
			.then(function(result){
				if(result !== null) {
					res.send(401,{'error':'spherezonetemplate_exist'});
					return next();
				}
				DAO_SphereZoneTemplate.findOne({},{id:true},{sort:{id: -1}}).exec()
					.then(function(result) {
						var spherezonetemplate = new DAO_SphereZoneTemplate();
						if(result === null) {
							spherezonetemplate.id = 1;
						} else {
							spherezonetemplate.id = (result.id + 1);
						}
						spherezonetemplate.name = req.params.name;
						spherezonetemplate.description = req.params.description;
						spherezonetemplate.applyEffectFrequency = req.params.applyEffectFrequency;
						spherezonetemplate.effects = req.params.effects;
						spherezonetemplate.duration = req.params.duration;
						spherezonetemplate.skin = req.params.skin;
						spherezonetemplate.color = req.params.color;
						spherezonetemplate.initialRadius = req.params.initialRadius;
						spherezonetemplate.growSpeed = req.params.growSpeed;
						spherezonetemplate.save(function(err, result, numberAffected){
							if(err) throw err;
							console.log('Add '+numberAffected+' spherezonetemplate');
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
}

module.exports = Route_SphereZoneTemplate;
