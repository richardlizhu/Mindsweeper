nodecsv
=============

This is a simple library to read and write csv.

https://github.com/yetsun/nodecsv



## Usage

Installation command is `npm install nodecsv`.


### Read CSV example
```javascript
var readCSV = require('nodecsv').readCSV;

readCSV('./csv_sample.csv', function(error, data){
  //data is a array of array
  //if csv_sample.csv is like this:
  //1,2,3
  //4,5,6
  //data will be:
  //[ [ '1', ' 2', ' 3' ], [ '4', ' 5', ' 6' ] ]
  console.log(data);
});

```

### Write CSV example 
```javascript
var writeCSV = require('nodecsv').writeCSV;

//output.csv will be like:
//1,2,3
//4,5,6
writeCSV('./output.csv', [ [ '1', ' 2', ' 3' ], [ '4', ' 5', ' 6' ] ], function(error){
  console.log(error);
});
```


### Append CSV example 
```javascript
var appendCSV = require('nodecsv').appendCSV;

//similar to writeCSV. appendCSV will append, of course.
appendCSV('./output.csv', [ [ '1', ' 2', ' 3' ], [ '4', ' 5', ' 6' ] ], function(error){
  console.log(error);
});
```
