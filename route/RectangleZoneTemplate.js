var Route_Abstract		= require('./Abstract.js');
var DAO_RectangleZoneTemplate		= require('../dao/RectangleZoneTemplate.js');
var inherit				= require('../utils/inherit.js');

var Route_RectangleZoneTemplate = function(){
	this.dao = DAO_RectangleZoneTemplate;
	this.collection = 'rectanglezonetemplate';
	this.uniqueField = 'id';
};
inherit(Route_RectangleZoneTemplate,Route_Abstract);

Route_RectangleZoneTemplate.prototype.addRoute = function(server) {
	Route_RectangleZoneTemplate._super.prototype.addRoute.call(this,server);

	server.post('/'+this.collection+'/update/:id', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		this.dao.findOne({'id':req.params.id}).exec()
			.then(
				function(rectanglezonetemplate){
					if(rectanglezonetemplate === null) {
						res.send(404);
						return next();
					} else {
						rectanglezonetemplate.name = req.params.name;
						rectanglezonetemplate.description = req.params.description;
						rectanglezonetemplate.applyEffectFrequency = req.params.applyEffectFrequency;
						rectanglezonetemplate.effects = req.params.effects;
						rectanglezonetemplate.duration = req.params.duration;
						rectanglezonetemplate.skin = req.params.skin;
						rectanglezonetemplate.color = req.params.color;
						rectanglezonetemplate.width = req.params.width;
						rectanglezonetemplate.height = req.params.height;
						rectanglezonetemplate.isSolid = req.params.isSolid;
						rectanglezonetemplate.save(function(err, result, numberAffected){
							if(err) next(err);
							res.send(200, rectanglezonetemplate);
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
					res.send(401,{'error':'rectanglezonetemplate_exist'});
					return next();
				}
				DAO_RectangleZoneTemplate.findOne({},{id:true},{sort:{id: -1}}).exec()
					.then(function(result) {
						var rectanglezonetemplate = new DAO_RectangleZoneTemplate();
						if(result === null) {
							rectanglezonetemplate.id = 1;
						} else {
							rectanglezonetemplate.id = (result.id + 1);
						}
						rectanglezonetemplate.name = req.params.name;
						rectanglezonetemplate.description = req.params.description;
						rectanglezonetemplate.applyEffectFrequency = req.params.applyEffectFrequency;
						rectanglezonetemplate.effects = req.params.effects;
						rectanglezonetemplate.duration = req.params.duration;
						rectanglezonetemplate.skin = req.params.skin;
						rectanglezonetemplate.color = req.params.color;
						rectanglezonetemplate.width = req.params.width;
						rectanglezonetemplate.height = req.params.height;
						rectanglezonetemplate.isSolid = req.params.isSolid;
						rectanglezonetemplate.save(function(err, result, numberAffected){
							if(err) throw err;
							console.log('Add '+numberAffected+' rectanglezonetemplate');
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

module.exports = Route_RectangleZoneTemplate;
