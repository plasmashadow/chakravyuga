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
});

describe('Task Test Suite', function(){
	it('should add work properly', function(){
		var task = new chakra.Task("type");
		var diff = $.Deferred();
		task.OnStart(function(data){
			console.log(data);
			diff.resolve(data);
		});
		task.do({'a':3});
		diff.done(function(data){
			assert.ok(data.a == 3);
		});
	});
})
