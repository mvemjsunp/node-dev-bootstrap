var twitter = require('ntwitter');
var redis = require('redis');
var credentials = require('./credentials.js');

//create redis client
var client = redis.createClient();	//connects to locally-running REDIS in vagrant instance

//if the 'awesome' key doesn't exist, create it
//redis gives a value to error and exists (boolean)
/*client.exists('awesome', function(error, exists) {  //when redis database responds, calls this function that takes two arguments -- error and exists
	//if error is define, then there was probably some 
	//problem connecting to redis
	if(error) {			
		console.log('ERROR: '+error);
	} 
	//otherwise exists will be available, and we can do something with it
	else if(!exists) {
		client.set('awesome', 0); //create the awesome key
	};
});*/			//this code isn't necessary since incrementing it creates it if it doesn't already exists

var t = new twitter({
	consumer_key: credentials.consumer_key,
	consumer_secret: credentials.consumer_secret,
	access_token_key: credentials.access_token_key,
	access_token_secret: credentials.access_token_secret
});

t.stream(
	'statuses/filter',
	{ track: ['awesome', 'cool', 'rad', 'gnarly', 'groovy'] },
	function(stream) {
		stream.on('data', function(tweet) {
			console.log(tweet.text);
			//if awesome is in the tweet text, increment counter
			if(tweet.text.match(/awesome/)) {
				client.incr('awesome');
			} else if(tweet.text.match(/cool/)) {
				client.incr('cool');
			} else if(tweet.text.match(/rad/)) {
				client.incr('rad');
			} else if(tweet.text.match(/gnarly/)) {
				client.incr('gnarly');
			} else if(tweet.text.match(/groovy/)) {
				client.incr('groovy');
			}
		});
	}
);