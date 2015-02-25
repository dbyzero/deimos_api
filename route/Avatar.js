var Route_Abstract	= require('./Abstract.js');
var DAO_Avatar		= require('../dao/Avatar.js');
var inherit			= require('../utils/inherit.js');

var Route_Avatar = function(){
	this.dao = DAO_Avatar;
	this.collection = 'avatar';
	this.uniqueField = 'id';
};
inherit(Route_Avatar,Route_Abstract);

Route_Avatar.prototype.addRoute = function(server) {
	Route_Avatar._super.prototype.addRoute.call(this,server);
	//GET /avatar/byowner/:name
	server.get('/'+this.collection+'/byowner/:name', function(req,res,next){
		this.dao.find({account_name:req.params.name}, '-_id -__v').exec()
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
					throw err;
				}
			).end(function() {
				return next();
			});
	}.bind(this));


	//POST /account/poisition/:x/:y/:orientation
	//Register a client with a Account/Password. Return the sessionid
	server.post('/'+this.collection+'/:id/position/:x/:y/:orientation', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		DAO_Avatar.findOne({id:req.params.id}).exec()
			//check if avatar exist
			.then(function(result){
				if(result == null) {
					res.send(404,'Unknow avatar')
				}
				DAO_Avatar.update({id:req.params.id},
				{
					'position':{
						'x':parseInt(req.params.x),
						'y':parseInt(req.params.y)
					},
					'animation':{
						'direction':req.params.orientation
					}
				},
				{
					'strict':false
				},
				function(err,nbr,result){
					if(nbr === 1 ) {
						res.send(200,result);
					} else {
						//not possible to reach ?
						res.send(404,result);
					}
					return next();
				});
			},function(err){throw err;})
	});


	//POST /account/poisition/:x/:y/:orientation
	//Register a client with a Account/Password. Return the sessionid
	server.post('/'+this.collection+'/:id/additem/:templateid/:color/:type', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		DAO_Avatar.findOne({id:req.params.id}).exec()
			//check if avatar exist
			.then(function(result){
				//find avatar ?
				if(result == null) {
					res.send(404,'Unknow avatar')
				}
				//need to recreate an empty inventory ?
				if(!Array.isArray(result.inventory)) {
					result.inventory = new Array(56);
				}
				//we try to find an empty space
				var _added = false;
				for(key in result.inventory) {
					//got it ?
					if(result.inventory[key] === null || result.inventory[key] === undefined) {
						//put new item !
						result.inventory[key] = {
							id:req.params.templateid,
							rgba:req.params.color,
							type:req.params.type
						}
						_added = true;
						break;
					}
				}
				//if inventory is full..
				if(!_added) {
					res.send(403,"Inventory is full");
					res.end();
				}
				//or update avatar inventory
				DAO_Avatar.update({id:req.params.id},
				{
					'inventory':result.inventory
				},
				{
					'strict':false
				},
				//when done send the answer
				function(err,nbr,result){
					if(nbr === 1 ) {
						res.send(200,result);
						res.end();
					} else {
						//not possible to reach ?
						res.send(404,result);
						res.end();
					}
					return next();
				});
			},function(err){throw err;})
	});
}

module.exports = Route_Avatar;