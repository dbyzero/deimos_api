var restify = require('restify');

function send(req, res, next) {
    res.send({'requested name : ':req.params.name});
    return next();
}

var server = restify.createServer({
    'handleUpgrades':true
});

server.post('/hello', function create(req, res, next) {
    res.send(201, Math.random().toString(36).substr(3, 8));
    return next();
});
server.get('/hello/:name', send);
server.head('/hello/:name', send);
//server.put('/hello', send);
//server.del('hello/:name', function rm(req, res, next) {
//    res.send(204);
//    return next();
//});

server.listen(10081, function() {
    console.log('%s listening at %s', server.name, server.url);
});
