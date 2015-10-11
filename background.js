chrome.runtime.onConnectExternal.addListener(function(port) {
    console.log("PORT:", port);
    
//    setInterval(function() {
//        port.postMessage(data);
//    }, 1000);


chrome.runtime.onMessage.addListener(
    function(request) {
        port.postMessage(request.data);
    });
        

    port.onMessage.addListener(function(msg) {
        console.log("web msg received");
    });
});

var crawl = function(url){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  var result = xhr.responseText;
  var resultJSON = JSON.parse(result);
  if (resultJSON.continue && resultJSON.continue.plcontinue !== ""){
    return result + "$#@$#@&^%" + crawl(url+"&plcontinue="+resultJSON.continue.plcontinue);
  }
  else{
   return (result);
  }
} 

var random = function(completeList)
{
  var n = completeList;
  randomArray = []
  for (i = 0; i < 10; i++)
  {
    randomArray[i] = Math.floor(n * Math.random());
  }
  return randomArray;
}

var Firebase = require('firebase');
var dataRef = new Firebase('https://blownupbyamind.firebaseio.com/');
dataRef.set("hello worlsdfsdfdsfdssuccessfd!");

window.onbeforeunload = function() {
    return "I hope you were mentally stimulated by this Wikipedia page!";
};

window.onload = function() {
  alert('hi!');
}

