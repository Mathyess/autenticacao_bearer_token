// src/Infrastructure/Providers/JWTProvider.js
const jwt = require('jsonwebtoken');
const config = require('@config');

class JWTProvider {
  generateToken(payload) {
    if (!payload || typeof payload !== 'object') {
      throw new Error('Invalid payload for JWT token');
    }
    
    // Verificar se os campos obrigatórios existem
    if (!payload.userId) {
      throw new Error('Payload must contain userId');
    }
    
    if (!payload.email) {
      throw new Error('Payload must contain email');
    }
    
    return jwt.sign(payload, config.jwt.secret, { 
      expiresIn: config.jwt.expiresIn,
      issuer: 'auth-api',
      audience: 'auth-api-users'
    });
  }

  verifyToken(token) {
    if (!token || typeof token !== 'string') {
      return null;
    }
    
    try {
      return jwt.verify(token, config.jwt.secret, {
        issuer: 'auth-api',
        audience: 'auth-api-users'
      });
    } catch (error) {
      return null;
    }
  }
}

module.exports = JWTProvider;

