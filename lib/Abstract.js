

(function(root){

  var Emitter = require('events').EventEmitter;
  var MAX_IDLE = 100;
  var MIN_IDLE = 0;

   function Endpoint(type, attrs){
     this.priorityType = type;
     this.attrs = attrs || {};
     this.idlity = 0;
     this.locked = false;
     this.queue = [];
     this.currentTask = null;
     this._events = new Emitter();
     this.isAvailable = function(){
       return !this.locked;
     };
     this.getTask = function(){
       return this.currentTask;
     }
   }

   Endpoint.prototype.AddTask = function(task){
     var _me = this;
     var index = this.queue.push(task);
     this.work();
     return {
       remove: function(){
          delete this.queue.pop(index-1);
       }
     }
   }

   Endpoint.prototype.onExecute = function(callback){
     this._events.on(this.priorityType, callback);
   }

   Endpoint.prototype.onEnd = function(callback){
     this._events.on('end', callback);
   }


   Endpoint.prototype.execute = function(task){
     this._events.emit(this.priorityType, task);

   }

   Endpoint.prototype.work = function(){
     worked_task = []
     for(var i = 0 ; i<this.queue.length; i++){
       this.execute(this.queue[i]);
       var task = this.queue[i];
       worked_task.push(task);
       var idx = this.queue.indexOf(task);
       if(idx!=-1){
         this.queue.splice(idx,1);
       }
     }
     this._events.emit('end',worked_task);
   }

   root.Endpoint = Endpoint;


})(module.exports);
