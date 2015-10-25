var colors =		require('colors');
var restify =		require('restify');
var mongoose =		require('mongoose');

var Route_Avatar			= require('./route/Avatar.js');
var Route_Teapot			= require('./route/Teapot.js');
var Route_Account			= require('./route/Account.js');
var Route_Session			= require('./route/Session.js');
var Route_GameArea			= require('./route/GameArea.js');
var Route_ItemTemplate		= require('./route/ItemTemplate.js');
var Route_MonsterTemplate	= require('./route/MonsterTemplate.js');
var Route_Level				= require('./route/Level.js');

var DAO_Account				= require('./dao/Account.js');
var DAO_Session				= require('./dao/Session.js');

var config					= require('./config.js');

//connect to bdd
console.log('Connecting to database'.white);
mongoose.connect(config.mongodbStringServer,function(err){

	//clean sessions
	if(config.mode !== 'debug') {
		DAO_Account.update({}, {'$unset':{'usedBySession':''}},{'multi':true},function(err,result){
			if(err) throw err;
			console.log('Account unlinked to session'.green);
			DAO_Session.remove({}, function(err) {
				if(err) throw err;
				console.log('Session cleaned'.green);
			});
		});
	}

	if (err) throw err;
	console.log('Connected!'.green.bold);

	//create server
	var server = restify.createServer({
		'handleUpgrades':true,
		'name':'Deimos API'
	});

	//for curl purpose
	server.pre(restify.pre.userAgentConnection());

	//adding body parser
	server.use(restify.bodyParser({ mapParams: true }));


	//global changement
	server.use(function(req,res,next){
		// console.log(req.headers);
		console.log(req.method + ' ' + req.url);
		// console.log('Kepp alive : '+req.isKeepAlive());
		res.setHeader('Connection','close');
		return next();
	});

	//addning CROS and accept OPTIONS method
	server.use(restify.CORS());
	server.use(restify.fullResponse());

	new Route_Teapot().addRoute(server);
	new Route_Account().addRoute(server);
	new Route_Avatar().addRoute(server);
	new Route_ItemTemplate().addRoute(server);
	new Route_MonsterTemplate().addRoute(server);
	new Route_GameArea().addRoute(server);
	new Route_Session().addRoute(server);
	new Route_Level().addRoute(server);

	//Log error
	server.use(function(req,res,next,err){
		console.log(err);
	});

	//starting server
	server.listen(config.port, function() {
		console.log('%s listening at %s', server.name.yellow.bold, server.url.yellow.bold);
	});

});
