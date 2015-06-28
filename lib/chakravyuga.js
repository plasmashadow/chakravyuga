var TaskManager = require('./Tashhash.js');
var ResourceManager = require('./Resourcehash.js');
var $ = require('jquery-deferred');

function Router(){

	var _me = this;
	_me.tasks =TaskManager;
	_me.resources = ResourceManager;
	_me.heap = [];

	_me.addTasks = function(type, tasks){
		if(tasks.hasOwnProperty('length')){
			tasks.forEach(function(task){
				_me.tasks.addTask(type, task)
			});
		}
		else{
			_me.addTasks(type, [tasks]);
		}
	}

	_me.addResources = function(type, resources){

	   if(resources.hasOwnProperty('length')){
	   	  resources.forEach(function(resource){
	   	  	_me.resources.addResource(type, resource);
	   	  });
	   }
	   else{
	   	_me.addResources(type, [resources]);
	   }
	}

	_me._build_resource_heap= function(type){
		var resources = _me.resources.get(type);

		var def = $.Deferred();
		var heap = _me.heap;
		resources.forEach(function(resource){
			if(!resource.lock && !resource.inactive){
				heap.push(resource);
			}
		});
		def.resolve(_me.heap.sort(function(a,b){
			return a.count - b.count;
		}));
		return  def.promise();
	}


	_me.select = function(type){

		var heap_diff = _me._build_resource_heap(type);
		var diff = $.Deferred();
		heap_diff.done(function(resources){
			var first = resources[0];
			diff.resolve(first);
		});
		return diff.promise();
	}

	_me.route = function(type, successcallback, errorcallback){
		var req = _me.select(type);
		req.done(function(resource){
			resource.lock = true;
			console.log(arguments);
			successcallback(resource, function(){
				resource.lock = false;
			});
			resource.count++;
		});
		req.fail(function(resource){
			errorcallback(resource);
		});
	}


}

module.exports =new Router();