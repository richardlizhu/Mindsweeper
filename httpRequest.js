'use strict';
var request = require('request');
var cheerio = require('cheerio');




var testUrl = "https://en.wikipedia.org/w/api.php?action=query&titles=title&prop=links&pllimit=max&format=json";


var crawl = function(url, callback)
{
	request({
 url:url,
    headers: {
      Host: 'en.wikipedia.org',
      Connection: 'keep-alive',
      //Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      //'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53',
      //Referer: amazonUrl+upc,
      //'Accept-Encoding': 'gzip, deflate, sdch',
      //'Accept-Language': 'en-US,en;q=0.8,zh-CN;q=0.6,zh-TW;q=0.4'
    }
	}, function(error, response, body){
		if (error){
			console.log("error");
		}
		else
		{
			var $ = cheerio.load(body);
			console.log(body);
			var json = JSON.parse(body);
			if (json.continue && json.continue.plcontinue !== "")
			{
				crawl(url+"&plcontinue="+json.continue.plcontinue, callback);
			}
		}

	});
	callback();
}


crawl (testUrl, function(){console.log("finished faffer")});