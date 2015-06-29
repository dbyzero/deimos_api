var Route_Abstract	= require('./Abstract.js');
var DAO_Level		= require('../dao/Level.js');
var inherit		= require('../utils/inherit.js');

var Route_Level = function(){
	this.dao = DAO_Level;
	this.collection = 'level';
	this.uniqueField = 'name';
};
inherit(Route_Level,Route_Abstract);


Route_Level.prototype.addRoute = function(server) {
	Route_Level._super.prototype.addRoute.call(this,server);
	server.get('/'+this.collection+'/byname/:name', function(req,res,next){
		this.dao.findOne({'name':req.params.name}, '-_id -__v').exec()
			.then(
				function(result){
					res.setHeader('Access-Control-Allow-Methods','GET');
					if(result instanceof Object) {
						res.send(200,result);
						return next();
					} else {
						res.send(404);
						return next();
					}
				},
				function(err){
					console.log(err);
					throw err;
				}
			).end(function() {
				next();
			});
	}.bind(this));

	server.post('/'+this.collection+'/:name', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		var level = new DAO_Level();
		level.name = req.params.name;
		level.blocks = req.params.blocks;
		level.width = req.params.width;
		level.height = req.params.height;
		level.save(function(err, result, numberAffected) {
			if(err) {
				throw err;
			}
			res.send(200,{
				'height':result.height,
				'width':result.width,
				'blocks':result.blocks,
				'name':result.name
			});
			next();
		});
	});
}

module.exports = Route_Level;
