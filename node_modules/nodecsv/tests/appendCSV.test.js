'use strict';
var should = require('should');
var appendCSV = require('../libs/appendCSV');

describe('appendCSV', function() {
  it('should be done without error', function(done) {
    var data = [[1,2,3],[4,5,6], [7,8,9]];
    var output_path = './output.csv';

    appendCSV(data, output_path, function(error, data){
      console.log(data);
      done();
    });
  });
});
 