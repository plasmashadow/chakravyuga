var exports;
module.exports = exports = {}

var Event = require('events');
var Emitter = Event.EventEmitter;
var NOW = function() {
  return new Date().getTime();
}

var IDEALITY_FACTOR = 60;



exports.EndPoint = Endpoint = function(type, skills, endpoint_data) {

  this.id = new Date().getTime();
  this.type = type;
  this.skills = skills || {};
  this._attrs = endpoint_data || {};
  this.activity = 0;
  this.counts = 0;
  this._sums = [];
}
Endpoint.prototype = new Emitter;
Endpoint.prototype.work = function(data) {
  this.emit('work', data);
  this.counts++;
  var now = NOW();
  this.lastactivity = now;
  this._sums.push(this.lastactivity);
  var activity = (function(sums) {
    var list = sums.map(function(element, index) {
      if (index == 0)
        return 0;
      return element - sums[index - 1];
    });
    return list;
  })(this._sums);
  this.activity = activity.reduce(function(a, b) {
    return a + b;
  }) / this.counts;
}


exports.Router = Router = function(){
   this._requestcounts = 0;
   this.types = {};
}

Router.prototype = new Emitter;

Router.prototype.registerType = function(type){
  if(!this.types[type])
      this.types[type]  = [];
}

Router.prototype.get = function(type){
  if(!this.types[type])
     throw new Error("Type not registered on Server");
  return this.types[type];
}

Router.prototype.register = function(type, Endpoint){
   this.get(type).push(Endpoint);
}

Router.prototype.select = function(type){
  if(!this.types[type])
     throw new Error("Cannot select from the type not registed");
  var endpts = this.get(type);
  endpts.sort(function(a,b){
    return a.activity-b.activity;
  });
  console.log(endpts.length)
  console.log(endpts.map(function(dat){return dat.activity}))
  return endpts[0];
}
