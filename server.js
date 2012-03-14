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
	client.mget(['awesome','gnarly'], function(error, responses) {
		console.log(responses);
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end('awesomeCount:' + responses[0] + '<br /> gnarlyCount:' + responses[1]);
	});
}).listen(3000);


// }).listen(3000);

console.log('Server running on port 3000');