

function TaskObserver(){

	var tasks  = {};
	var listeners = {};

	var events = require('events').EventEmitter;
	return {

		addTask: function(type, task){
			if(!tasks[type])
				tasks[type] = [];

			tasks[type].push({
				skill: type,
				task: task,
				done: false,
				dropped: false
			});
			// events.on('add', task);
		},

		get: function(type){
			if(!tasks[type])
				return;
			return tasks[type];
		},

		addEventListener: function(type, callback){
			events.on(type, callback);
		}

	}
}

module.exports = TaskObserver();