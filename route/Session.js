var Route_Abstract	= require('./Abstract.js');
var DAO_Session		= require('../dao/Session.js');
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
	//TODO: EN FAITE UN ABSTRACT
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
}

module.exports = Route_Session;