var restify =		require('restify');
var mongoose =		require('mongoose');
var colors =		require('colors');

var Route_Account			= require('./route/Account.js');
var Route_Avatar			= require('./route/Avatar.js');
var Route_ItemTemplate		= require('./route/ItemTemplate.js');
var Route_MonsterTemplate	= require('./route/MonsterTemplate.js');
var Route_GameArea			= require('./route/GameArea.js');
var Route_Session			= require('./route/Session.js');
var Route_Teapot			= require('./route/Teapot.js');

//connect to bdd
console.log('Connecting to database'.white);
mongoose.connect('mongodb://localhost:27017/deimos_test',function(err){
	if (err) throw err;
	console.log('Connected!'.green.bold);


	//create server
	var server = restify.createServer({
		'handleUpgrades':true,
		'name':'Webcraft API'
	});

	//for curl purpose
	server.pre(restify.pre.userAgentConnection());

	new Route_Teapot().addRoute(server);
	new Route_Account().addRoute(server);
	new Route_Avatar().addRoute(server);
	new Route_ItemTemplate().addRoute(server);
	new Route_MonsterTemplate().addRoute(server);
	new Route_GameArea().addRoute(server);
	new Route_Session().addRoute(server);

	//starting server
	server.listen(10081, function() {
		console.log('%s listening at %s', server.name.yellow.bold, server.url.yellow.bold);
	});
});