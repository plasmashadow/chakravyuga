

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

   Endpoint.prototype.AddTask = function(task, auto){
     var _me = this;
     var index = this.queue.push(task);
     console.log(task);
     if(auto)
        this.work();
     return {
       remove: function(){
            return this.queue.pop(index-1);
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
     console.log(this.queue.length);
     for(var i = 0 ; i< this.queue.length; i++){
       this.execute(this.queue[i]);
       var task = this.queue[i];
       console.log("task is::" + JSON.stringify(task) +"::"+ i);
       worked_task.push(task);
       var idx = this.queue.indexOf(task);
       console.log(idx);
     }
     this.queue = [];
     this._events.emit('end',worked_task);
   }

   root.Endpoint = Endpoint;

   function Task(type, attrs){
     this.priorityType = type;
     this.locked = false;
     this.done = false;
     this._events = new Emitter();
   }

   Task.prototype.isDone = function(){
     return !this.done;
   }

   Task.prototype.isLocked = function(){
     return !this.locked;
   }

   Task.prototype.OnStart = function(callback){
     this._events.on('start', callback);
   }

   Task.prototype.OnEnd = function(callback){
     this._events.on('end', callback);
   }

   Task.prototype.do = function(data){
     this._events.emit('start', data);
   }

   root.Task = Task;

   var Units = require('./Abstract.js');
   var $ = require('jquery-deferred');
   var _ = require('underscore');
   var Endpoint = Units.Endpoint;
   var uuid = require('node-uuid');


   function EndPointContainer() {
     var $scope = this;
     $scope.endpoints = [];
     $scope._bytype = {};
   }

   EndPointContainer.prototype.register = function(type, attrs) {
     if (!this._bytype[type])
       this._bytype[type] = [];
     var endpoint_index = this.endpoints.push({
       uuid: uuid.v1(),
       endpoint: new Endpoint(type, attrs)
     });
     var type_index = this._bytype[type].push(this.endpoints[endpoint_index-1].endpoint);
     var $scope = this;
     return {
        remove: function(){
            $scope.endpoints.splice(endpoint_index, 1);
            $scope._bytype[type].splice(type_index, 1);
        },
        addTask: function(taskObj, onExecute, onEnd){
           $scope._bytype[type][type_index-1].onExecute(onExecute);
           $scope._bytype[type][type_index-1].onEnd(onEnd);
           $scope._bytype[type][type_index-1].AddTask(taskObj);
        }
     }
   }

   EndPointContainer.prototype.select = function(type){
     var endpoints = this._bytype[type];
     var deferred =  $.Deferred();
     var queued = [];
      _.map(endpoints, function(end, key){
         if(end.locked != true)
              queued.push(end);
     });
     var result = _.sortBy(queued, function(end){
        return end.queue.length;
     });
     return {
       pop: function(){
         return result.splice(0,1);
       },
       addTask: function(taskObj){
          //result[0].onExecute(onExecute);
          // result[0].onEnd(onEnd);
          result[0].AddTask(taskObj);
       },

       AddTask: this.addTask,

       get: function(){
         return result[0];
       },
       onExecute: function(callback){
         result[0].onExecute(callback);
       },
       onEnd: function(callback){
         result[0].onEnd(callback);
       },
       work: function(){
         result[0].work();
       }
     };
   }

   root.Router = EndPointContainer;

})(module.exports);
