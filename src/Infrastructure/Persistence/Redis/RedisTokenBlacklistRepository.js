// src/Infrastructure/Persistence/Redis/RedisTokenBlacklistRepository.js
const { redisClient } = require('./RedisClient');

class RedisTokenBlacklistRepository {
  async add(token, expiresIn) {
    try {
      if (redisClient.isReady) {
        await redisClient.setEx(`blacklist:${token}`, expiresIn, 'true');
      } else {
        console.warn('Redis not connected, skipping token blacklist');
      }
    } catch (error) {
      console.error('Error adding token to blacklist:', error);
      // Em desenvolvimento, podemos continuar sem blacklist
      if (process.env.NODE_ENV !== 'development') {
        throw error;
      }
    }
  }

  async exists(token) {
    try {
      if (redisClient.isReady) {
        const result = await redisClient.get(`blacklist:${token}`);
        return result === 'true';
      } else {
        console.warn('Redis not connected, token not in blacklist');
        return false;
      }
    } catch (error) {
      console.error('Error checking token blacklist:', error);
      // Em desenvolvimento, assumimos que o token não está na blacklist
      if (process.env.NODE_ENV !== 'development') {
        throw error;
      }
      return false;
    }
  }
}

module.exports = RedisTokenBlacklistRepository;



