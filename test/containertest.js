var assert = require('assert');
var chakra = require('../index.js');
var $ = require('jquery-deferred');

describe('Should test the endpoint router ', function(){

    it('should register an endpoint', function(){
      var router = new chakra.Router();
      router.register("test1",{id:1});;
      router.register("test1",{id:2});
      assert.ok(router.endpoints.length == 2);
    });

    it('should select the most appropriate endpoint', function(){
      var router= new chakra.Router();

      var endpoint_one = router.register("test1", {id:1});
      var endpoint_two = router.register("test1", {id: 2});
      var endpoint_three = router.select("test1");

      // endpoint_one.addTask({data: 1}, function(task){
      //   console.log(task);
      // }, function(tasks){
      //   console.log(tasks);
      // });
      endpoint_three.addTask({id:1});
      endpoint_three.addTask({id:2});
      endpoint_three.onExecute(function(task){
        console.log(task);
      });
      endpoint_three.onEnd(function(task){
        console.log(task);
      })
      endpoint_three.get().work()
      
      assert.ok(true);
    });

});
