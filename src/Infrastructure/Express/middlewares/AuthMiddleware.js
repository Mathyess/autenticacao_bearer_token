// src/Infrastructure/Express/middlewares/AuthMiddleware.js
const JWTProvider = require('@Infrastructure/Providers/JWTProvider');
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

      // Verifica a validade do token usando JWTProvider
      const jwtProvider = new JWTProvider();
      const decoded = jwtProvider.verifyToken(token);
      
      if (!decoded) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      
      req.user = decoded; // Adiciona os dados do usuário decodificados ao objeto req
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      return res.status(500).json({ message: 'Internal server error during authentication' });
    }
  };
};

module.exports = { authenticateToken };



