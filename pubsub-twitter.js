const redis = require('redis');
const Twit = require('twit');

// Use env keys (or just add as a string for local testing)
// You can get your tokens from apps.twitter.com
const {
    CONSUMER_KEY = '',
    CONSUMER_SECRET = '',
    ACCESS_TOKEN = '',
    ACCESS_TOKEN_SECRET = ''
} = process.env;

// Let us initialize the Twit library
const T = new Twit({
    consumer_key: CONSUMER_KEY,
    consumer_secret: CONSUMER_SECRET,
    access_token: ACCESS_TOKEN,
    access_token_secret: ACCESS_TOKEN_SECRET
});

const subscriber = redis.createClient();
const publisher = redis.createClient();
 
const CHANNEL = 'tweets';
 
subscriber.on('subscribe', function subcribe() {
    // Let us filter twitter stream based on redis keyword
    const stream = T.stream('statuses/filter', { track: ['trump', 'biden'], language: 'en' })

    // Listen for tweets
    stream.on('tweet', function onTweet(tweet) {
        // Destructure the twitter object to get what we need for our json to publish
        const {
            created_at,
            text,
            user: {
                screen_name
            }
        } = tweet;

        // Publish to the channel
        publisher.publish(
            CHANNEL,
            JSON.stringify({
                createdAt: created_at,
                text,
                userName: screen_name
            })
        );
    });
});
 
subscriber.on('message', function(channel, message) {
    console.log('CHANNEL: ' + channel);
    console.log('MESSAGE:', JSON.parse(message));
});
 
subscriber.subscribe(CHANNEL);
