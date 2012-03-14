var http = require('http');
var redis = require('redis');

var client = redis.createClient();
//var awesomeCount = client.get('awesome');    

// http.createServer(function (req, res) {
// 	client.get('awesome',function(error, awesomeCount) {	//send in callback, so when it
// 		client.get('cool',function(error, coolCount) {		//responds function is called
// 			client.get('rad',function(error, radCount) {
// 				client.get('gnarly',function(error, gnarlyCount) {
// 					client.get('groovy',function(error, groovyCount) {
// 			
// 		if(error) {											
// 			awesomeCount = error;	//if not really necessary, presented here for clarity
// 		}
// 		res.writeHead(200, {'Content-Type': 'text/html'});
// 	    res.end('awesome count: ' + awesomeCount + '<br /> cool count : ' + coolCount + 
// 		'<br /> rad count : ' + radCount + '<br /> gnarly count : ' + gnarlyCount + 
// 		'<br /> groovy count : ' + groovyCount);
// 					});
// 				});
// 			});
// 		});
// 	});
	
http.createServer(function (req, res) {
	client.mget(['awesome','cool','rad','gnarly','groovy'], function(error, responses) {
		console.log(responses);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('<font face="sans-serif">AWESOME has been tweeted <strong>' + responses[0] + '</strong> times' + '<br /><br /> COOL has been tweeted <strong>' + responses[1] + '</strong> times' + '<br /><br /> RAD has been tweeted <strong>' + responses[2] + '</strong> times' +  '<br /><br /> GNARLY has been tweeted <strong>' + responses[3] + '</strong> times' +  '<br /><br /> GROOVY has been tweeted <strong>' + responses[4] + '</strong> times');
	});
}).listen(3000);


// }).listen(3000);

console.log('Server running on port 3000');