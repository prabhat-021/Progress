// import { createClient } from 'redis';
const { createClient } = require("redis");

// const client = createClient({
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//         host: 'redis-18413.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
//         port: 18413
//     }
// });


// const client = await createClient();

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// const redis = require('redis'); // Assuming you're using the 'redis' library

async function createClients() {
    try {

        const client = createClient();
        await client.connect();
        return client;

    } catch (error) {

        console.error('Redis Client Error:', error);
        throw error;
    }
}

module.exports = createClients;

// module.exports = { client };