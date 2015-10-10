'use strict';
var should = require('should');

var readCSV = require('../libs/readCSV');

describe('readCSV', function() {
  it('should be done without error', function(done) {

    //var input_path = '/Users/junye/Workspace/gitlab/spider_amazon/tests/test_products.csv';
    var input_path = './test_products.csv';

    readCSV(input_path, function(error, data){
      console.log(data);
      done();
    });
  });
});
 