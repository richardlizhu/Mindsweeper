//document.addEventListener('visibilitychange', function() {
//    getData();
//})

var graph={};

// The ID of the extension we want to talk to.
var editorExtensionId = "pfjicihngnbhjmjafeomgmennngngeio";
var port = chrome.runtime.connect(editorExtensionId);
port.postMessage("hi from webpage");
console.log("message sent");
port.onMessage.addListener(function(msg) {
  // See other examples for sample onMessage handlers.
  console.log("extension message received");
graph = msg;
draw(graph);
});
