const asyncRedis = require('async-redis');
const client = asyncRedis.createClient();

client.on('error', console.error);

async function main() {
    // Set the hash:id with many values (hmset)
    // Set one value only with hset
    await client.hmset('user:1337', 'id', '1337', 'name', 'dothash', 'email', 'dothash@sy2x.xyz');
    
    // Get a certain value by using hmget
    console.log(await client.hmget('user:1337', 'name'));

    // Get the hash by using hgetall
    console.log(await client.hgetall('user:1337'));

    // Delete the hash
    // console.log(await client.hgetall('user:1337'));

    // Delete a key from the hash set
    await client.hdel('user:1337', 'email');
    console.log(await client.hgetall('user:1337'));

    // Delete the whole hash set
    await client.del('user:1337');
    console.log(await client.hgetall('user:1337'));

    // Exit gracefully
    process.exit(1);
}

main();
