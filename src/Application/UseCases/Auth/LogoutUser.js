// src/Application/UseCases/Auth/LogoutUser.js
const jwt = require('jsonwebtoken');
const config = require('@config');

class LogoutUser {
  constructor(tokenBlacklistRepository) {
    this.tokenBlacklistRepository = tokenBlacklistRepository;
  }

  async execute(token) {
    try {
      // Decodifica o token para obter informações de expiração
      const decoded = jwt.decode(token);
      
      if (!decoded) {
        throw new Error('Invalid token format');
      }

      // Calcula o tempo restante de expiração
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenExp = decoded.exp;
      const timeToExpire = tokenExp - currentTime;

      // Se o token já expirou, não precisa adicionar à blacklist
      if (timeToExpire <= 0) {
        return { message: 'Token already expired' };
      }

      // Adiciona o token à blacklist com TTL igual ao tempo restante
      await this.tokenBlacklistRepository.add(token, timeToExpire);

      return { message: 'Logged out successfully' };
    } catch (error) {
      throw new Error('Failed to logout: ' + error.message);
    }
  }
}

module.exports = LogoutUser;


