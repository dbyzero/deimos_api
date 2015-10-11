var Route_Abstract	= require('./Abstract.js');
var DAO_Session		= require('../dao/Session.js');
var DAO_Account		= require('../dao/Account.js');
var inherit			= require('../utils/inherit.js');

var Route_Session = function(){
	this.dao = DAO_Session;
	this.collection = 'session';
	this.uniqueField = 'id';
};
inherit(Route_Session,Route_Abstract);

//adding /session/register/:ip/:account/:avatar
Route_Session.prototype.addRoute = function(server) {
	Route_Session._super.prototype.addRoute.call(this,server);

	//check if session exists
	server.get('/'+this.collection+'/check/:login/:id', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','GET');
		DAO_Session.findOne({id:req.params.id,account:req.params.login}).exec()
			.then(function(result){
				if(result != null) {
					res.send(200);
					return next();
				} else {
					res.send(404,'Unknow session');
					return next();
				}
			},function(err){
				throw err;
			});
	}.bind(this));

	//check if session exists
	server.get('/'+this.collection+'s', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','GET');
		DAO_Session.find({},{"_id":false,"__v":false}).exec()
			.then(function(result){
				if(result != null) {
					res.send(200,result);
					return next();
				} else {
					res.send(404,'No session');
					return next();
				}
			},function(err){
				throw err;
			});
	}.bind(this));

	//unregister session
	server.del('/'+this.collection+'/unregister/:id', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','DELETE');
		DAO_Session.findOne({id:req.params.id}).exec()
			.then(function(result){
				if(result != null) {
					DAO_Session.remove({id:req.params.id}).exec();
					res.send(204);
					return next();
				} else {
					res.send(404,'Unknow session');
					return next();
				}
			},function(err){
				throw err;
			});
	}.bind(this));

	//clear session connected to a specified level
	server.del('/'+this.collection+'/clean/:level', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','DELETE');
		DAO_Session.remove({'gamearea':decodeURI(req.params.level)}, function(err) {
			if(err) throw err;
			console.log('Cleaning session linked to game area '.bold + req.params.level.yellow.bold);
		});
		res.end();
		return next();
	}.bind(this));
}

module.exports = Route_Session;
