// src/Infrastructure/Persistence/Redis/RedisClient.js
const { createClient } = require('redis');
const config = require('@config');

const redisClient = createClient({
  url: config.redis.url // 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
  if (!redisClient.isReady) {
    await redisClient.connect();
    console.log('Connected to Redis');
  }
};

module.exports = { redisClient, connectRedis };

