/**
 *
 * Inherit Object
 *
 * @author dbyzero
 * @date : 2015/02/08
 * @description : Inherit model
 * 
 * */

var inherit = function(obj, parent) {

	for (var prop in parent) {
		obj[prop] = parent[prop];
	}

	obj._super = parent;
	obj.prototype = Object.create(parent.prototype, {
		constructor: {
			value: obj,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
}

module.exports = inherit;