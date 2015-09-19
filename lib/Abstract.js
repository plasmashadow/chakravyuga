var exports;
module.exports = exports = {}

var Event = require('events');
var Emitter = Event.EventEmitter;
var intersection = require('array-intersection');

var NOW = function() {
  return new Date().getTime();
}

var IDEALITY_FACTOR = 2*60*1000*60;


exports.IDEALITY_FACTOR = IDEALITY_FACTOR;


exports.EndPoint = Endpoint = function(type, skills, endpoint_data) {


  this.id = new Date().getTime();
  this.type = type;
  this.skills = skills || [];
  this._attrs = endpoint_data || {};
  this.activity = 0;
  this.counts = 0;
  this._sums = [];
  this.locked = false;
}
Endpoint.prototype = new Emitter;

Endpoint.prototype.work = function(data) {
  this.locked = true;
  this.done = (function(){
    this.locked =false;
  }).bind(this);
  this.emit('work', data, this.done);
  this.addCount();
  var now = NOW();
  this._sums.push(now);
}

Endpoint.prototype.addCount = function(){
   var _last = this._sums.slice(-1);
   if(!_last){
      this.counts++;
      return;
   }
   var _last_date = new Date(_last);
   if((NOW()-_last_date) >= exports.IDEALITY_FACTOR)
      this.counts = 0;
   this.counts++;
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

Router.prototype.select = function(type, skills){
  if(!this.types[type])
     throw new Error("Cannot select from the type not registed");
  var endpts = this.get(type);
  var selected_endpoints = endpts.filter(function(end){
     var values = intersection(end.skills, skills);
     if(values.length> 0){
       return true;
     }
     return false;
  });
  selected_endpoints.sort(function(a,b){
    return a.counts - b.counts;
  });
  
  return selected_endpoints[0];
}
