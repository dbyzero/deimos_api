var Route_Abstract		= require('./Abstract.js');
var DAO_GameArea		= require('../dao/GameArea.js');
var inherit				= require('../utils/inherit.js');

var Route_GameArea = function(){
	this.dao = DAO_GameArea;
	this.collection = 'gamearea';
	this.uniqueField = 'id';
};
inherit(Route_GameArea,Route_Abstract);

Route_GameArea.prototype.addRoute = function(server) {
	Route_GameArea._super.prototype.addRoute.call(this,server);
	//GET /gamearea/byurl/:url
	//get gamearea by regex, return first match
	server.get('/'+this.collection+'/byurl/:url', function(req,res,next){
		this.dao.find({}, '-_id -__v').exec()
			.then(
				function(result){
					res.setHeader('Access-Control-Allow-Methods','GET');
					if(result instanceof Object) {
						// if (result.length == 1) result = [result];
						for(var i=0;i<result.length;i++) {
							if(unescape(req.params.url).match(result[i].regexUrl) !== null) {
								res.send(200,result[i])
								return next();
							}
						}
						res.send(404);
						return next();
					} else {
						res.send(404);
						return next();
					}
				},
				function(err){
					throw err;
				}
			).end(function() {
				res.end();
				return next();
			});
	}.bind(this));

	server.get('/'+this.collection+'/byname/:name', function(req,res,next){
		this.dao.find({name:req.params.name}, '-_id -__v').exec()
			.then(function(result){
					res.setHeader('Access-Control-Allow-Methods','GET');
					if(result instanceof Object) {
						res.send(200,result[0])
						return next();
					}
					res.send(404);
					return next(404);
				},
				function(err){
					throw err;
				})
			.end(function() {
				res.end();
				return next();
			});
	}.bind(this));

	server.post('/'+this.collection+'/update/:id', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		this.dao.findOne({'id':req.params.id}).exec()
			.then(
				function(gamearea){
					if(gamearea === null) {
						res.send(404);
						return next();
					} else {
						gamearea.name = req.params.name;
						gamearea.regexUrl = req.params.regexUrl;
						gamearea.blocks = req.params.blocks;
						gamearea.width = req.params.width;
						gamearea.height = req.params.height;
						gamearea.areaDomID = req.params.areaDomID;
						gamearea.save(function(err, result, numberAffected){
							if(err) next(err);
							res.send(200, gamearea);
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
					res.send(401,{'error':'gamearea_exist'});
					return next();
				}
				DAO_GameArea.findOne({},{id:true},{sort:{id: -1}}).exec()
					.then(function(result) {
						var gamearea = new DAO_GameArea();
						if(result === null) {
							gamearea.id = 1;
						} else {
							gamearea.id = (result.id + 1);
						}
						gamearea.name = req.params.name;
						gamearea.regexUrl = req.params.regexUrl;
						gamearea.blocks = req.params.blocks;
						gamearea.width = req.params.width;
						gamearea.height = req.params.height;
						gamearea.areaDomID = req.params.areaDomID;
						gamearea.save(function(err, result, numberAffected){
							if(err) throw err;
							console.log('Add '+numberAffected+' gamearea');
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

module.exports = Route_GameArea;
