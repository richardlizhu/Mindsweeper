'use strict';

var fs = require('fs');
var parse = require('csv-parse');


var readCSV = function(csvFilePath, callback){

  var parser = parse({delimiter: ','}, function(error, data){
  	if(error){
      callback(error);
  	}else{
      callback(null, data);  
    }
  });


  fs.createReadStream(csvFilePath).pipe(parser);
};


module.exports = readCSV;