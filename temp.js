'use strict';

//Take in a list of randomly generated titles
//Take in a list of titles that the user seems to enjoy
//Output a string of the title from the randomly generated titles that is most similar to the ones the user enjoys

var request = require('request');
var cheerio = require('cheerio');


// But we want the numerical part of this result for a ton of combos of string1s and string2s

var crawl = function(stringList, stringToCompare, cumArray, callback)
{
	if (stringList.length == 0)
	{
		callback(cumArray);
	}
	else
	{
		var string1 = stringList[0];
		var testUrl = "http://api.dandelion.eu/datatxt/sim/v1/?text1=" + string1 + "&text2=" + stringToCompare + "%20&$app_id=17137ab3&$app_key=876cecdd42eaedbd2a52f64d3c9c1461&lang=en";
		request({
	 url:testUrl,
    headers: {
      Host: 'http://api.dandelion.eu/datatxt/sim/v1',
      Connection: 'keep-alive',
      //Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      //'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
      //Referer: amazonUrl+upc,
      //'Accept-Encoding': 'gzip, deflate, sdch',
      //'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh-TW;q=0.4'
    }
	}, function(error, response, body){
		if (error){
			console.log(error);
			console.log("error");
		}
		else
		{
			var $ = cheerio.load(body);

			var json = JSON.parse(body);
			var toAddElement = {
				string : string1,
				weight : json.similarity
			}
			cumArray.push(toAddElement);
			stringList = stringList.slice(1);
			crawl(stringList, stringToCompare, cumArray, callback);
		}	

	});

	}
}




var functionForRichard = function(listOfRandomTitles, listOfGoodTitles, callbacks){
	crawl(listOfRandomTitles, listOfGoodTitles, [], function(finalVal){ 
	var weightList = finalVal;
	var bestValue = -1;
	var bestTitle = "";
	for (var i = 0; i < listOfRandomTitles.length; i++){
		if (parseInt(weightList[i]["weight"]) > bestValue){
			bestValue = parseInt(weightList[i]["weight"]);
			bestTitle = weightList[i]["string"];
		}
	}
	callbacks(bestTitle);});

}


//functionForRichard(["Penis","bottle","sand","Transistor","comp","book"],["Transistor","Transistors"], function(hello){console.log(hello);});