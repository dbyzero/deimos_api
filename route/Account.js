var Route_Abstract	= require('./Abstract.js');
var DAO_Account		= require('../dao/Account.js');
var DAO_Session		= require('../dao/Session.js');
var inherit			= require('../utils/inherit.js');
var cryptojs		= require('crypto-js');

var Route_Account = function(){
	this.dao = DAO_Account;
	this.collection = 'account';
	this.uniqueField = 'login';
};
inherit(Route_Account,Route_Abstract);

Route_Account.prototype.addRoute = function(server) {
	Route_Account._super.prototype.addRoute.call(this,server);
	//GET /account/id/:id
	server.get('/'+this.collection+'/id/:id', function(req,res,next){
		this.dao.findOne({id:req.params.id}, '-_id -__v').exec()
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
				next();
			});
	}.bind(this));

	//POST /account/register/:account/:password
	//Register a client with a Account/Password. Return the sessionid
	server.post('/'+this.collection+'/register/:account/:password', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		DAO_Account.findOne({login:req.params.account},'+usedBySession +password').exec()
			//check if account exist
			.then(function(result){
				if(result != null) {
					if(!!result.usedBySession) {
						res.send(403,{'error':'already_used','sessionid':result.usedBySession});
						return next();
					}
					if(req.params.password !== result.password) {
						res.send(403,'Bad credentials')
						return next();
					}
					//if all is ok, let's check if a session use this account
					return DAO_Session.findOne({account:req.params.account}).exec()
				} else {
					res.send(403,'Bad credentials')
					return next();
				}
			},function(err){throw err;})
			//we are in the DAO_Session promise 
			.then(function(result){
				if(result != null) {
					res.send(403,{'error':'already_used','sessionid':result.id});
					return next();
				}
				//else we register the account and return the session id
				var sessionid = cryptojs.MD5(req.params.account + new Date() + '!!secret_string!!!!!!!!' + parseInt(Math.random()*0, 100000))+'';
				var session = new DAO_Session();
				session.id = sessionid;
				session.ip = req.connection.remoteAddress;
				session.account = req.params.account;
				session.avatar = null;
				session.save(function(err, result, numberAffected){
					if(err) throw err;
					res.send(200,{sessionid:result.id });
					return next();
				});
			},function(err){throw err;})
	});
}

module.exports = Route_Account;
