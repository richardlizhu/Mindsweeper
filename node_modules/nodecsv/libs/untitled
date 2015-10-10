'use strict';

var stringify = require('csv-stringify');
var fs = require('fs');

var appendCSV = function(data, path, callback){

  stringify(data, function(error, output){

    if(error){
      callback(error);
    }

    fs.appendFile(path, output, function(error) {
      if(error) {
        callback(error);
      }

      callback(null);
    });
  });
};


module.exports=appendCSV;