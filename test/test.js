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
  var ep = new chakra.EndPoint("type", {
    language: "tamil"
  }, {
    id: "code_black"
  });

  var ep1 = new chakra.EndPoint("type", {
    language: "tamil"
  }, {
    id: "code_black"
  });

  var ep2 = new chakra.EndPoint("type", {
    language: "tamil"
  }, {
    id: "code_black"
  });
  var router = new chakra.Router()

  router.registerType('type');
  router.register('type',ep);

  console.log(router.select('type'))
})
