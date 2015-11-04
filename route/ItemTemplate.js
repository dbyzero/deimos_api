var Route_Abstract		= require('./Abstract.js');
var DAO_ItemTemplate	= require('../dao/ItemTemplate.js');
var inherit				= require('../utils/inherit.js');

var Route_ItemTemplate = function(){
	this.dao = DAO_ItemTemplate;
	this.collection = 'itemtemplate';
	this.uniqueField = 'id';
};
inherit(Route_ItemTemplate,Route_Abstract);

Route_ItemTemplate.prototype.addRoute = function(server) {
	Route_ItemTemplate._super.prototype.addRoute.call(this,server);
	server.post('/'+this.collection+'/create/:name', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		DAO_ItemTemplate.findOne({name:req.params.name}).exec()
			.then(function(result){
				if(result !== null) {
					res.send(401,{'error':'itemtemplate_exist'});
					return next();
				}
				DAO_ItemTemplate.findOne({},{id:true},{sort:{id: -1}}).exec()
					.then(function(result) {
						var itemtemplate = new DAO_ItemTemplate();
						if(result === null) {
							itemtemplate.id = 1;
						} else {
							itemtemplate.id = (result.id + 1);
						}
						itemtemplate.name = req.params.name;
						itemtemplate.skin = req.params.skin;
						itemtemplate.slot = req.params.slot;
						itemtemplate.skills = req.params.skills;
						itemtemplate.save(function(err, result, numberAffected){
							if(err) throw err;
							console.log('Add ' + numberAffected + ' itemtemplate');
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
				function(itemtemplate){
					if(itemtemplate === null) {
						res.send(404);
						return next();
					} else {
						itemtemplate.name = req.params.name;
						itemtemplate.skin = req.params.skin;
						itemtemplate.slot = req.params.slot;
						itemtemplate.skills = req.params.skills;
						itemtemplate.save(function(err, result, numberAffected){
							if(err) next(err);
							res.send(200, itemtemplate);
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

module.exports = Route_ItemTemplate;
