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
				next();
			});
	}.bind(this));
}

module.exports = Route_Avatar;