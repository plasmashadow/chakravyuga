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

```javascript
var chakra = require('chakravyga');

chakra.addResouces("sample", [{'a':1},{'b':1}, {'c': 1}]);
chakra.addTasks("sample", [1,2,3,4,5]);

chakra.route("sample", function(resource){
	console.log("resource selected", resource);
}, function(error){
    console.log(error);
});

```

###Licence

MIT