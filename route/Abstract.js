var Route_Abstract = function(){
	this.dao = null;
	this.collection = null;
	this.uniqueField = null;
};

Route_Abstract.prototype.addRoute = function(server) {
	if(!this.dao) {
		throw new Error('You have to declare a dao');
	}
	if(!this.collection) {
		throw new Error('You have to declare a collection');
	}
	if(!this.uniqueField) {
		throw new Error('You have to declare am uniqueField');
	}

	//POST {dao}/id
	server.get('/'+this.collection+'/:uniquefield', function(req,res,next){
		var searchObject = {}
		searchObject[this.uniqueField] = req.params.uniquefield;
		this.dao.findOne(searchObject, '-_id -__v').exec()
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

	//DELETE {dao}/id
	server.del('/'+this.collection+'/:id', function(req,res,next){
		var searchObject = {}
		searchObject[this.uniqueField] = req.params.id;
		res.setHeader('Access-Control-Allow-Methods','DELETE');
		this.dao.findOne(searchObject).exec()
			.then(
				function(result){
					if(result != null) {
						this.dao.remove(searchObject).exec();
						res.send(204);
						return next();
					} else {
						res.send(404,'ID not found');
						return next();
					}
				}.bind(this),
				function(err){
					throw err;
				}.bind(this)
			);
	}.bind(this));
}

module.exports = Route_Abstract;