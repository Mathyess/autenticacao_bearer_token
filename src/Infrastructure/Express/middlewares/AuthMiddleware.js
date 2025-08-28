// src/Infrastructure/Express/middlewares/AuthMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('@config');

const authenticateToken = (tokenBlacklistRepository) => {
  return async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      // Verifica se o token está na blacklist
      const isBlacklisted = await tokenBlacklistRepository.exists(token);
      if (isBlacklisted) {
        return res.status(401).json({ message: 'Token has been revoked' });
      }

      // Verifica a validade do token
      jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user; // Adiciona os dados do usuário decodificados ao objeto req
        next();
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error during authentication' });
    }
  };
};

module.exports = { authenticateToken };



