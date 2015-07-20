var assert = require('assert');
var chakra = require('../index.js');
var $ = require('jquery-deferred');


describe('Endpoint Test Suite', function(){
	 it('should add Task', function(){
		 var ep = new chakra.Endpoint();
		 var diff = $.Deferred();
		 ep.onExecute(function(task){
			console.log(task);
		 });
		ep.onEnd(function(tasks){
			console.log(tasks);
			diff.resolve(tasks);
		});
		 ep.AddTask({"find": "this"});
		 ep.AddTask({"find": "that"});
		diff.done(function(tasks){
			assert.ok(true);
		});
	});
})
