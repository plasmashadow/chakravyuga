var assert = require('assert');
var charkra = require('../index.js');
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
})