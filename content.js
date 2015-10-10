var crawl = function(url)
{
var xhr = new XMLHttpRequest();

xhr.open("GET", url, false);
xhr.send();

var result = xhr.responseText;
var resultJSON = JSON.parse(result);
if (resultJSON.continue && resultJSON.continue.plcontinue !== "")
{
	crawl(url+"&plcontinue="+resultJSON.continue.plcontinue);
}
	return (resultJSON);
}






var crawlUrl = window.location.href;
crawlUrl = crawlUrl.substring(crawlUrl.lastIndexOf("/")+1);
crawlUrl = "https://en.wikipedia.org/w/api.php?action=query&titles=" + crawlUrl + "&prop=links&pllimit=max&rvprop=content&format=json";
var json = crawl(crawlUrl);
