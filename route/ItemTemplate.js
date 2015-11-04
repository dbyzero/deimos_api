var Route_Abstract		= require('./Abstract.js');
var DAO_ItemTemplate	= require('../dao/ItemTemplate.js');
var inherit				= require('../utils/inherit.js');

var Route_ItemTemplate = function(){
	this.dao = DAO_ItemTemplate;
	this.collection = 'itemtemplate';
	this.uniqueField = 'id';
};
inherit(Route_ItemTemplate,Route_Abstract);

module.exports = Route_ItemTemplate;
