var twitter = require('ntwitter');
var credentials = require('./credentials.js');

var twitter = new twitter({
	consumer_key: credentials.consumer_key,
	consumer_secret: credentials.consumer_secret,
	access_token_key: credentials.access_token_key,
	access_token_secret: credentials.access_token_secret
});

twitter.stream(
	'statuses/filter',
	{ track: ['awesome', 'cool', 'rad', 'gnarly', 'groovy'] },
	function(stream) {
		stream.on('data', function(tweet) {
			console.log(tweet.text);
		});
	}
);