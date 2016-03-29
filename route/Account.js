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
					next(err);
				}
			).end(function() {
				next();
			});
	}.bind(this));

	//unregister session
	server.del('/'+this.collection+'/del/:id', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','DELETE');
		DAO_Account.findOne({id:req.params.id}).exec()
			.then(function(result){
				if(result != null) {
					DAO_Account.remove({id:req.params.id}).exec();
					res.send(204);
					return next();
				} else {
					res.send(404,'Unknow account');
					return next();
				}
			},function(err){
				next(err);
			});
	}.bind(this));

	server.post('/'+this.collection+'/registerbytoken/:sessionid', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		DAO_Session.findOne({id:req.params.sessionid}).exec()
			//check if account exist
			.then(function(result){
				if(result != null) {
					res.send(200,{account:result.account });
					return next();
				} else {
					res.send(403,'Bad token');
					return next();
				}
			},function(err){next(err);})
	});

	//POST /account/register/:account/:password
	//Register a client with a Account/Password. Return the sessionid
	server.post('/'+this.collection+'/register/:account/:password', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		var sessionid = null;
		DAO_Account.findOne({login:req.params.account}).exec()
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
			},function(err){next(err);})
			//we are in the DAO_Session promise and create session
			.then(function(result){
				if(result != null) {
					res.send(403,{'error':'already_used','sessionid':result.id});
					return next();
				}
				//else we register the account and return the session id
				sessionid = cryptojs.MD5(req.params.account + new Date() + '!!secret_string!!!!!!!!' + parseInt(Math.random()*0, 100000))+'';
				var session = new DAO_Session();
				session.id = sessionid;
				session.ip = req.connection.remoteAddress;
				session.account = req.params.account;
				session.avatar = null;
				session.save(function(err, result, numberAffected){
					if(err) next(err);;
					return result;
				});
			},function(err){next(err);})
			//we are in dao save session promise
			.then(function(){
				DAO_Account.update(
					{'login':req.params.account},
					{'usedBySession':sessionid},
					{'strict':false},
					function(err,nbr,resultSaveAvatar){
						if(nbr === 1 ) {
							res.send(200,{'sessionid':sessionid });
						}
						return next();
					});
			},function(err){next(err);})
	});

	//POST /account/register/:account/:password
	//Register a client with a Account/Password. Return the sessionid
	server.post('/'+this.collection+'/create/:account/:password/:mail', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		DAO_Account.findOne({login:req.params.account}).exec()
			//check if account exist
			.then(function(result){
				if(result !== null) {
					res.send(401,{'error':'user_exist'});
					return next();
				}
				DAO_Account.findOne({},{id:true},{sort:{id: -1}}).exec()
					.then(function(result) {
						var account = new DAO_Account();
						var accoundId = result ? result.id + 1 : 1;
						account.id = accoundId,
						account.login = req.params.account;
						account.password = req.params.password;
						account.mail = req.params.mail;
						account.save(function(err, result, numberAffected){
							if(err) next(err);;
							res.send(200,{accountid:result.id });
							return next();
						});
					},function(err){
						if(err) next(err);
					})
			},function(err){
				if(err) next(err);
			});
	});

	//POST /account/register/:account/:password
	//Register a client with a Account/Password. Return the sessionid
	server.post('/'+this.collection+'/update/:id', function(req,res,next){
		res.setHeader('Access-Control-Allow-Methods','POST');
		DAO_Account.findOne({id:req.params.id}).exec()
			//check if account exist
			.then(function(account){
				if(account === null) {
					res.send(404,{'error':'unknow_account'});
					return next();
				}
				account.login = req.params.login;
				account.password = req.params.password;
				account.mail = req.params.mail;
				account.save(function(err, result, numberAffected){
					if(err) next(err);
					res.send(200,{accountid:result.id });
					return next();
				});
			},function(err){
				next(err);;
			});
	});
}

module.exports = Route_Account;
