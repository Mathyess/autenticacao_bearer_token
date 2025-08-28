// src/Infrastructure/Persistence/Redis/RedisTokenBlacklistRepository.js
const { redisClient } = require('./RedisClient');

class RedisTokenBlacklistRepository {
  async add(token, expiresIn) {
    await redisClient.setEx(`blacklist:${token}`, expiresIn, 'true');
  }

  async exists(token) {
    const result = await redisClient.get(`blacklist:${token}`);
    return result === 'true';
  }
}

module.exports = RedisTokenBlacklistRepository;



