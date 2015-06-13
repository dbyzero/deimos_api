var config = {
	'localhost': {
		'mongodbStringServer' : 'mongodb://localhost:27017/deimos_test',
		'port' : 1081
	},
	'docker': {
		'mongodbStringServer' : 'mongodb://localhost:27017/deimos_test',
		'port' : 80
	}
};

var args = {};
for (var idx = process.argv.length - 1; idx >= 0; idx--) {
	var argumentRaw = process.argv[idx];
	//not a valid arg
	if(argumentRaw.substr(0,2) !== '--') continue;
	var argument = argumentRaw.split('=');
	if(argument.length === 1) {
		args[argument] = null;
	} else {
		args[argument[0].substr(2)] = argument[1];
	}
};

if(args['env'] === undefined) throw new Error('No environement specified');
if(config[args['env']] === undefined) throw new Error('Unknow environnement');

console.log('Using configuration : ');
console.log(config[args['env']]);

module.exports = config[args['env']];
