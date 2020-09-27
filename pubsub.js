const redis = require('redis');

// Create pub sub clients
const publisher = redis.createClient();
const subscriber = redis.createClient();

// Our channel name
const CHANNEL = 'dothash';
 
// Let us start publish to our channel when subscription is initialized
subscriber.on('subscribe', function subcribe() {
    // publisher.publish(CHANNEL, 'a message');
    setInterval(() => publisher.publish(CHANNEL, new Date()), 1000)
});

// Listen for messages based on our channel for a new message
subscriber.on('message', function(channel, message) {
    console.log('CHANNEL:', channel);
    console.log('MESSAGE:', message);
});
 
subscriber.subscribe(CHANNEL);
