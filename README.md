##Chakravyga

[![Build Status](https://travis-ci.org/plasmashadow/chakravyuga.svg?branch=master)](https://travis-ci.org/plasmashadow/chakravyuga)
[![NPM Version](http://img.shields.io/npm/v/chakravyga.svg?style=flat)](https://www.npmjs.org/package/chakravyga)
[![NPM Downloads](https://img.shields.io/npm/dm/chakravyga.svg?style=flat)](https://www.npmjs.org/package/chakravyga)

###Description

Consider a n task done m resources,  with each task has their own custom skill. This tasks
will get routed to one of the m resource. This algorithm select the suitable resource based on the skill which is required for the task to be done and as well as the availability of resource.


###Installation

```javascript
  npm install chakravyga
```

###Usage

Resouces and tasks can be any objects.

####Endpoints

Endpoints are the point where the task gets proccessed.

```javascript
   var chakra = require('chakravyga');
   var Endpoint = chakra.Endpoint;

   var end = new Endpoint("type");

   end.AddTask({data: {process: true}}, true);  
   //true if you want the task to be proccessed automatically when it is
   //added.

   /*
     Takes a callback method for executing the task.
   */
   end.onExecute(function(task_data){
     doSomething(task_data);
   });
   /*
     A callback which takes batch_of ended task.
   */
   end.onEnd(function(end_batch){
     doSomething(end_batch);
   });

   //make the endpoint to work.
   end.work();

```

#### Router

Router can be explained as a common point which subscribes to the incoming tasks.
and selects the tasks based on enpoint availability.

```javascript

   var chakra = require('chakravyga');
   var Router = chakra.Router;
   var router = new Router();

   //Inorder to register a endpoint with the router.
   var end_p = router.register('type', {data:1,out:2})

   //adding task to a the Endpoint
   end_p.addTask({obj:1,data:3}, function(task){
     console.log(task);
   }, function(tasks){
     console.log(tasks);
   });

   //Inorder to get a endpoint from the router

   var end_select = router.select("type").get();

```


###Licence

MIT
