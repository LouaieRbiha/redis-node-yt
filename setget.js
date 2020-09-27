// Require the async redis library
const asyncRedis = require('async-redis');

// Create the client, we are using default settings, but can override like this:
// { host: myredis.com, port: 1337 }
const client = asyncRedis.createClient();

// Log the error if any
client.on('error', console.error);

// Create an async function 
async function main() {
    // Set the key
    await client.set('coffee', 'yes, please');
    
    // Get the key
    console.log(await client.get('coffee'));

    // Delete the key
    await client.del('coffee')
    console.log(await client.get('coffee'));

    // Exit gracefully
    process.exit(1);
}

// Initialize the function
main();
