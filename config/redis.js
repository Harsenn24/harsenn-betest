const { createClient } = require('redis');

const client = createClient({
  url: 'redis://127.0.0.1:6379' 
})

client.on('error', err => console.log('Redis Client Error', err));

client.connect().then(() => {
  console.log('Connected to Redis');
}).catch(err => {
  console.error('Connection to Redis failed', err);
});

module.exports = client