
var runningList=[["Bananas",20],["Apples",35]];
var neighbors = [];
function draw(graph) {

var width = window.screen.width,
    height = window.screen.height;

var force = d3.layout.force()
    .size([width, height])
    .charge(-400)
    .linkDistance(40)
    .on("tick", tick);

var drag = force.drag()
    .on("dragstart", dragstart);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var link = svg.selectAll(".link"),
    node = svg.selectAll(".node");

//graphs = stringJSON.split("&$^^#%$%$#&");
//graph = /*JSON.parse(graphs);*/{"a" : ["c","d","e"], "b":["a","g","h"]};
  var nodes = [];
  var edges = [];
  var skip = false;
  var num_skipped = 0;
//path = "interest.json";
  var keys = Object.keys(graph);
  for (var i = 0; i < Object.keys(graph).length; i++) {
    nodes.push({"x": keys[i]});
  }
    //runningList.push([keys[keys.length-1], getpref(path, window.location.href)]);
  for (var i = 0; i < Object.keys(graph).length; i++) {
    for (item in graph[keys[i]]) { 
       for (var j = 0; j < keys.length; j++) {
            var c = graph[keys[i]][item];
            var b = (keys[j])
            if (c == b) {  
                edges.push({"source": j, "target": i});
                skip = true;
                num_skipped++;
                break;
           }
       }
       if (!skip) {
         nodes.push({"x": graph[keys[i]][item]});     
         edges.push({"source": i, "target": edges.length+keys.length - num_skipped});
         neighbors.push({"source": i, "target": edges.length+keys.length - num_skipped});
        }
        skip = false;
    }
  }   

  //alert(JSON.stringify(nodes));
  //alert(JSON.stringify(edges));
  force
      .nodes(nodes)
      .links(edges)
      .start();

  link = link.data(edges)
    .enter().append("line")
      .attr("class", "link");

var page = window.location.href;

  node = node.data(nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 12)
    //.style("fill", function(i) {
        //return Math.round(Math.random()* (1<<20));}
      /*.style("fill", function(i) { 1
            var x = (readfile("./new_muse_final/interest.json", page)[0])[1]; //rgb color
            var r = x[0]>>>4;
            var g = x[1]>>>4;
            var b = x[2]>>>4;
                })*/
      .on("dblclick", dblclick)
      .call(drag);



function tick() {
  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

function dblclick(d) {
  d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
}



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


window.onbeforeunload = function() {
    return "I hope you were mentally stimulated by this Wikipedia page!";
};

var fs  = require("fs");
function getpref (path, page){
//  var fileText = fs.readFileSync(path).toString();
//  alert(fileText);
//  fileText = JSON.parse(fileText);
  var interest = fileText.interest;
  var concentration = fileText.concentration;
    return interest * concentration;
}

function readfile (path, page){
  var fileText = fs.readFileSync(path).toString();
  alert(fileText);
  fileText = JSON.parse(fileText);
  return ({page: colorCreate(fileText)});
  var interest = fileText.interest;
  var concentration = fileText.concentration;
}


