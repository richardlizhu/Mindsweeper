
runningList = [["Apples",20],["Transistors",70]]
neighbors = ["Bananas","Quantum Computing", "Zero", "Battle of Britain"]


var sortByPref = function(runningList){
  runningList.sort( function(x, y){ return y[1] - x[1] } )
}

var change = function(){
  //sortByPref(msg.runningList);
  //newTitle = relatedButton(neighbors, runningLIst, function(result){return result;});
  var n = Math.floor(Math.random()*neighbors.length);

  document.getElementById("textarea").value = neighbors[n];
}

window.onload = function() {
  startup();
}

var startup = function(){
  var btn = document.getElementById("myBtn");
  btn.addEventListener("click",function(){change();});
}