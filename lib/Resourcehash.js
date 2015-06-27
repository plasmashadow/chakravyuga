
function ResourceObserver(){

	var resources  = {};
	var listeners = {};

	var events = require('events').EventEmitter;

	return {

		addResource: function(type, resource){
			if(!resources[type])
				resources[type] =[];
			// events.emit('add', resource);
			resources[type].push({
				skill: type,
				resource: resource,
				count: 0,
				lock: false,
				inactive: false
			});
		},

		get: function(type){
			var values = resources[type];
			if(!values)
				throw "Not type found"
			return values.sort(function(a,b){
				 return a.count - b.count;
			})
		},

		addEventListener: function(type, callback){
			events.on(type,callback);
		}
	}
}

module.exports = ResourceObserver();