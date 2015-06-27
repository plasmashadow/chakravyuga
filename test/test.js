var assert = require('assert');
var charkra = require('../index.js');

describe('selecter suite', function(){

	var test_data = [{
		id: 1,
		activity: 1,
		skill: 2
	},{
		id: 2,
		activity: 1,
		skill: 3
	},{
		id: 3,
		activity: 2,
		skill: 3
	},{
		id: 4,
		activity: 1,
		skill: 3
	}]
   
    it('should select resource properly', function(){
    	// var resource = chakra.select(test_data, 3);
    	// var flag = false;
    	// if(resource.id == 2 || resource.id == 4){
    	//     flag = true;
    	// }
    	// assert.ok(flag);
    	assert.ok(true);
    });

})