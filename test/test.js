var assert = require('assert');
var chakra = require('../index.js');
var $ = require('jquery-deferred');


describe('Endpoint work', function() {

  it('should emit task correctly', function(done) {
    var ep = new chakra.EndPoint("type", {
      language: "tamil"
    }, {
      id: "code_black"
    });

    ep.on('work', function(data) {

    });

    ep.work({
      id: 1
    });
    setTimeout(function() {
      ep.work({
        id: 2
      });
      console.log("Activity is ==> " + ep.activity);
      done();
    }, 1000);
    ep.work({
      id: 3
    });
  });
});


describe('Router Work', function(){

  it('should wait till', function(done){
    var ep = new chakra.EndPoint("type", {
      language: "tamil"
    }, {
      id: "code_black"
    });
    ep.on('work', function(data){})

    var ep1 = new chakra.EndPoint("type", {
      language: "tamil"
    }, {
      id: "code_black"
    });
    ep1.on('work', function(data){})

    var ep2 = new chakra.EndPoint("type", {
      language: "tamil"
    }, {
      id: "code_black"
    });
    ep2.on('work', function(data){})
    var router = new chakra.Router()

    router.registerType('type');
    router.register('type',ep);
    router.register('type',ep1);
    router.register('type', ep2);

    end = router.select('type')
    console.log(end);
    end.work("this one");
    console.log(end.activity)
    setTimeout(function(){
      end = router.select('type')
      console.log(end);
      end.work("this one");
      console.log(end.activity)

    }, 1000)

    setTimeout(function(){
      end = router.select('type')
      console.log(end);
      end.work("this one");
      console.log(end.activity)
      done();
    }, 1500);
  })

})
