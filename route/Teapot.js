var Route_Abstract = function(){
};

Route_Abstract.prototype.addRoute = function(server) {
	server.get('/teapot', function(req,res,next){
		res.send(418,'I\'m a teapot!');
	});
}

module.exports = Route_Abstract;