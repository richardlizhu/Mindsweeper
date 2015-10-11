var fs  = require("fs");
var readFile = function(path, page){
  var fileText = fs.readFileSync(path).toString();
  alert(fileText);
  fileText = JSON.parse(fileText);
  return ({page: colorCreate(fileText)});
  var interest = fileText.interest;
  var concentration = fileText.concentration;
}
var fs  = require("fs");
var readFile = function(path, page){
  var fileText = fs.readFileSync(path).toString();
  alert(fileText);
  fileText = JSON.parse(fileText);
  return ({page: colorCreate(fileText)});
  var interest = fileText.interest;
  var concentration = fileText.concentration;
}
