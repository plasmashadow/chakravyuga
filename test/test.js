var assert = require('assert');
var chakra = require('../index.js');
var $ = require('jquery-deferred');


describe('Endpoint work', function(dn) {

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
      done();
    }, 1000);
    ep.work({
      id: 3
    });
  });

  it('should increment the count', function(done){
    var ep = new chakra.EndPoint("type", {id: 1});
    ep.on('work', function(data, dn){
      dn();
    });
    ep.work("this is my work");
    assert.ok(1 == ep.counts);
    setTimeout(done, 1000);
  });

  xit('should lock the resource on use', function(done){
    var ep = new chakra.EndPoint("type", {id: 1});
    ep.on('work', function(data, dn){
      console.log(ep.locked + "==> locking")
      assert.ok(true == ep.locked);
      dn();
      assert.ok(false == ep.locked);
      done()
    });
    ep.work("this is my work");
  });

});



describe('Router Work', function(){
  var ep1 = new chakra.EndPoint("type",["tamil"], {id: 1});
  var ep2 = new chakra.EndPoint("type",["english"], {id: 2});
  var ep3 = new chakra.EndPoint("type",["tamil"], {id: 3});
  it('should select a resource based on skill', function(done){
    var router = new chakra.Router();
    router.registerType("type")
    router.register("type", ep1);
    router.register("type", ep2);
    router.register("type", ep3);
    var ep = router.select("type", ["tamil"]);
    ep.once('work', function(data, dn){
       console.log(ep._attrs);
       dn();
    });
    ep.work();
    ep = router.select("type", ["tamil"]);
    ep.once('work', function(data, dn){
       console.log(ep._attrs);
       dn();
    });
    ep.work();
    done();
  })

})
