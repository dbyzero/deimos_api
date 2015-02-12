var Route_Abstract		= require('./Abstract.js');
var DAO_MonsterTemplate	= require('../dao/MonsterTemplate.js');
var inherit				= require('../utils/inherit.js');

var Route_MonsterTemplate = function(){
	this.dao = DAO_MonsterTemplate;
	this.collection = 'monstertemplate';
	this.uniqueField = 'id';
};
inherit(Route_MonsterTemplate,Route_Abstract);

module.exports = Route_MonsterTemplate;