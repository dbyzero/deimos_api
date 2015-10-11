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
			.then(function(resultAvatar){
				//find avatar ?
				if(resultAvatar == null) {
					res.send(404,'Unknow avatar')
				}
				//need to recreate an empty inventory ?
				if(!Array.isArray(resultAvatar.inventory)) {
					resultAvatar.inventory = new Array(56);
				}
				//we try to find an empty space
				var _added = false;
				for(key in resultAvatar.inventory) {
					//got it ?
					if(resultAvatar.inventory[key] === null || resultAvatar.inventory[key] === undefined) {
						//put new item !
						resultAvatar.inventory[key] = {
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
					res.send(304,"Inventory is full");
					res.end();
				}
				//or update avatar inventory
				DAO_Avatar.update({id:req.params.id},
				{
					'inventory':resultAvatar.inventory
				},
				{
					'strict':false
				},
				//when done send the answer
				function(err,nbr,result){
					if(nbr === 1 ) {
						res.send(200,resultAvatar.inventory);
						res.end();
					}
					return next();
				});
			},function(err){throw err;})
	});

	//POST /account/register/:account/:password
	//Register a client with a Account/Password. Return the sessionid
	server.post('/'+this.collection+'/create/:account/:avatarname', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		DAO_Avatar.findOne({name:req.params.avatarname},'+usedBySession +password').exec()
			//check if account exist
			.then(function(result){
				if(result !== null) {
					res.send(401,{'error':'avatar_exist'});
					return next();
				}
				DAO_Avatar.findOne({},{id:true},{sort:{id: -1}}).exec()
					.then(function(result) {
						try {
							var avatar = new DAO_Avatar();
							if(result === null) {
								avatar.id = 1;
							} else {
								avatar.id = (result.id + 1);
							}

							//owner info
							avatar.name = req.params.avatarname;
							avatar.account_name = req.params.account;
							avatar.onGameArea = null;

							//draw info
							avatar.skin = 'avatar';
							avatar.deltashow = {x:25,y:40};
							avatar.size = {x:50,y:20};
							avatar.rgba = req.params.color || '#000000';
							avatar.animation = {direction:'left'};

							//move metrics
							avatar.jump_speed = 700;
							avatar.move_speed = 350;
							avatar.position = {x:0,y:0};
							avatar.velocity = {x:0,y:0};
							avatar.acceleration = {x:0,y:0};
							avatar.mass = 1;

							//inventory
							avatar.item_slot_chest = null;
							avatar.item_slot_foot = null;
							avatar.item_slot_head = null;
							avatar.item_slot_left_hand = null;
							avatar.item_slot_right_hand = null;
							avatar.titleOwned = [];
							avatar.titleSelected = null;
							avatar.inventory = [];

							//attributs
							avatar.strengh = req.params.strengh || 0;
							avatar.focus = req.params.focus || 0;
							avatar.endurance = req.params.endurance || 0;
							avatar.training = req.params.training || 0;
							avatar.willpower = req.params.willpower || 0;

							avatar.hp = req.params.hp || 1;
							avatar.will = req.params.will || 0;
							avatar.damage = req.params.damage || 0;
							avatar.skillBonus = req.params.skillBonus || 0;
							avatar.willRegen = req.params.willRegen || 0;

							avatar.save(function(err, result, numberAffected){
								if(err) throw err;
								res.send(200,avatar);
								return next();
							});
						} catch (err) {
							throw err;
						}
					},function(err){
						throw err;
					});
			},function(err){
				throw err;
			});
	});
}

module.exports = Route_Avatar;
