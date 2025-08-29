// src/Infrastructure/Persistence/Redis/RedisClient.js
const { createClient } = require('redis');
const config = require('@config');

const redisClient = createClient({
  url: config.redis.url // 'redis://localhost:6379'
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client Connected'));
redisClient.on('ready', () => console.log('Redis Client Ready'));

const connectRedis = async () => {
  try {
    if (!redisClient.isReady) {
      await redisClient.connect();
      console.log('Connected to Redis');
    }
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    // Em desenvolvimento, podemos continuar sem Redis
    if (process.env.NODE_ENV === 'development') {
      console.log('Continuing without Redis in development mode');
    } else {
      throw error;
    }
  }
};

module.exports = { redisClient, connectRedis };

