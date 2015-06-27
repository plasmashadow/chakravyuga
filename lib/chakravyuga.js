function Router(){
	var events = require('events').EventEmitter;
	var Heap = require('heap');
	var resources = [];
	var tasks = [];

	this.priority = null;

	this.addEventListener = function(type, callback){
		events.on(type, callback);
	}

	this.addResource = function(resource, skill){
		var resourceObj = {
			lock: false,
			resource: resource,
			skill: skill,
			count: 0
		};
		events.emit('onresourceadd', resourceObj);
		resources.push(resourceObj);

		return {
			makeActive: function(flag){
				resourceObj.lock = flag;
			},
			get: function(){
				return resource;
			}
		}
	}

	this.addTask = function(task, skill){
		var taskObj = {
			done: false,
			task: task
		}
		events.emit('onaddtask', taskObj);
		tasks.push(taskObj);

		return {
			doDone: function(flag){
				taskObj.done = flag;
			},
			get: function(){
				return task;
			}
		}
	}

	this.addPriority = function(priority){
		this.priority = priority;
	}


	this.select = function(){

	}

	this._onselecttask = function(){
		tasks.forEach(function(task){

		});
	}

}