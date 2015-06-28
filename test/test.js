var assert = require('assert');
var chakra = require('../index.js');
var taskobserver = require('../lib/Tashhash.js');
var resobserver = require('../lib/Resourcehash.js');


describe('taskobserver suite', function(){

	it('should add the task', function(){
		taskobserver.addTask("hello", {'a': 1});
		var value = taskobserver.get("hello");
		assert.ok(value[0].task['a'], 1);
	});
});

describe('resouce observer suite', function(){

	it('should add observer', function(){
		resobserver.addResource("hello", {"hey": 1});
		var value = resobserver.get("hello");
		assert.ok(value[0].resource['hey'], 1);
	})
});


describe('router suite', function(){

	it('should route', function(){
		var ch = chakra;
		ch.addResources("hi", [1,2,3]);
		ch.addTasks("hi", [1,2,3,4,5]);
		var req = ch.route('hi', function(resource, done){
			console.log(resource);
			done();
		}, function(error){
			console.log(error);
		});
	});
});