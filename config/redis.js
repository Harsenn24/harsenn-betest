const { createClient } = require('redis');
const { config } = require('dotenv');
config()
const client = createClient({
  url: process.env.REDIS_URL
})

client.on('error', err => console.log('Redis Client Error', err));

client.connect().then(() => {
  console.log('Connected to Redis');
}).catch(err => {
  console.error('Connection to Redis failed', err);
});

module.exports = client