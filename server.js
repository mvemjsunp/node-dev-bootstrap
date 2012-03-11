var http = require('http');
var redis = require('redis');

var client = redis.createClient();
var awesomeCount = client.get('awesome');

http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('awesome count: ' + awesomeCount);
}).listen(3000);

console.log('Server running on port 3000');