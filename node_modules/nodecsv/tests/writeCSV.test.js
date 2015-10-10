'use strict';
var should = require('should');
var writeCSV = require('../libs/writeCSV');

describe('writeCSV', function() {
  it('should be done without error', function(done) {
    var data = [[1,2,3],[4,5,6], [7,8,9]];
    var output_path = './output_' + new Date().getTime() + '.csv';

    writeCSV(data, output_path, function(error, data){
      console.log(data);
      done();
    });
  });
});
 