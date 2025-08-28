// src/Infrastructure/Express/middlewares/AuthMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../../../config');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, config.jwt.secret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = user; // Adiciona os dados do usuário decodificados ao objeto req
    next();
  });
};

module.exports = { authenticateToken };



