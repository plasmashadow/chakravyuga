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
   // Each endpoints have
   // type = "major classification on an endpoint"
   // skills = "skills assosiated with the endpoint"
   // data = "data assosiated with the endpoint"

   var sathya = new Endpoint('scifi', ["tamil", "chennai"], {
     id: "AZ0123TYQ",
     usename: 'mugiwara'
   });

   sathya.once('work', function(data, done){
       //where the data be task data.
       console.log(data);
       done();
   });

```

#### Router

Router can be explained as a common point which subscribes to the incoming tasks.
and selects the tasks based on enpoint availability.

```javascript

   var chakra = require('chakravyga');
   var Router = chakra.Router;
   var router = new Router();
   var Endpoint = chakra.Endpoint;
   // Each endpoints have
   // type = "major classification on an endpoint"
   // skills = "skills assosiated with the endpoint"
   // data = "data assosiated with the endpoint"

   var sathya = new Endpoint('scifi', ["tamil", "chennai"], {
     id: "AZ0123TYQ",
     usename: 'shanks'
   });

   sathya.once('work', function(data, done){
       //where the data be task data.
       console.log(data);
       done();
   });

   var adhi = new Endpoint('scifi', ["tamil", "chennai"], {
     id: "AZ0123TYP",
     usename: 'ace'
   });

   adhi.once('work', function(data, done){
       //where the data be task data.
       console.log(data);
       done();
   });

   var magesh = new Endpoint('scifi', ["tamil", "chennai"], {
     id: "AZ0123TYR",
     usename: 'benn beckman'
   });

   magesh.once('work', function(data, done){
       //where the data be task data.
       console.log(data);
       done();
   });

   router.registerType('strawhatspirates');
   router.register('strawhatspirates', sathya);
   router.register('strawhatspirates', magesh);

   router.registerType('whitebeardpirates');
   router.register('whitebeardpirates', adhi);

   var end = router.select('strawhatspirates', ['tamil']);
   end.work(new Message());

```


###Licence

MIT
