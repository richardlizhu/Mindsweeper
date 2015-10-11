//var Firebase = require('firebase');
//alert(typeof Firebase);
//var dataRef = new Firebase('https://blownupbyamind.firebaseio.com/');
//dataRef.set("hello world!");



var crawl = function(url)
{
var xhr = new XMLHttpRequest();

xhr.open("GET", url, false);
xhr.send();

var result = xhr.responseText;
var resultJSON = JSON.parse(result);
if (resultJSON.continue && resultJSON.continue.plcontinue !== "")
{
	return result + "$#@$#@&^%" + crawl(url+"&plcontinue="+resultJSON.continue.plcontinue);
}
else
{
	return (result);
}
} 


var database = [];
var cumulator = 0;

window.onload = function() {
  
}

var crawlUrl = window.location.href;
crawlUrl = crawlUrl.substring(crawlUrl.lastIndexOf("/")+1);
crawlUrl = "https://en.wikipedia.org/w/api.php?action=query&titles=" + crawlUrl + "&prop=links&pllimit=max&rvprop=content&format=json";
var jsonText = crawl(crawlUrl);

var jsonTextArray = jsonText.split("$#@$#@&^%");
var jsonArray = [];
for (i =0;i < jsonTextArray.length; i++)
{
	jsonArray.push(JSON.parse(jsonTextArray[i]));
} 
var numPre = jsonArray[0].query.pages;
var num = Object.keys(numPre);
var title=numPre[num].title;
//var num = Object.keys jsonArray
var links = numPre[num].links;
for (i=1;i<jsonArray.length;i++)
{
	var temp = jsonArray[i].query.pages[num].links;
	links = links.concat(temp);
}
	while(links[links.length-1].ns !== 0)
	{
		links.pop();
	}






var linksReal = [];
for (i=0;i<50; i++)
{
	linksReal.push(links[Math.floor(links.length*Math.random())])
}
var toAdd = {

	title : title,
	//id : num, 
	links : links
};


function getCache()
{
	var tempLocal = localStorage.cumVar;
	localStorage.clear();
	return tempLocal;
}


//alert(localStorage.cumVar);
if(localStorage.cumVar)
{
	//alert("cumvar");
	localStorage.cumVar += "@$^^#%$%$#&"+toAdd;
}
else
{
	//alert("no cumvar");
	localStorage.cumVar = JSON.stringify(toAdd);
}
//alert(localStorage.cumVar);



window.onbeforeunload = function() {

    chrome.runtime.sendMessage({data: JSON.stringify(toAdd)});
    return "I hope you were mentally stimulated by this Wikipedia page!";
};



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


var relatedButton = function(completeList)
{
	randomArray = random(completeList);
	functionForRichard(randomArray, getGood(completeList), function(answer) { alert(answer)}) ;
}


var getGood = function(completeList)
{
	return completeList.slice(0,20);
}


var getUrl = function()
{
	return window.location.href;
}
