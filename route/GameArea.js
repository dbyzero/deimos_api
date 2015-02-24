var Route_Abstract		= require('./Abstract.js');
var DAO_GameArea		= require('../dao/GameArea.js');
var inherit				= require('../utils/inherit.js');

var Route_GameArea = function(){
	this.dao = DAO_GameArea;
	this.collection = 'gamearea';
	this.uniqueField = 'name';
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
}

module.exports = Route_GameArea;