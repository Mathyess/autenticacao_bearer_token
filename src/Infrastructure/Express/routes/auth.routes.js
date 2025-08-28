// src/Infrastructure/Express/routes/auth.routes.js
const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const validate = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../validationSchemas/authSchemas');
const { authenticateToken } = require('../middlewares/AuthMiddleware');

module.exports = (registerUserUseCase, loginUserUseCase, logoutUserUseCase, tokenBlacklistRepository) => {
  const router = Router();
  const authController = new AuthController(registerUserUseCase, loginUserUseCase, logoutUserUseCase);

  router.post('/register', validate(registerSchema), authController.register.bind(authController));
  router.post('/login', validate(loginSchema), authController.login.bind(authController));
  router.post('/logout', authenticateToken(tokenBlacklistRepository), authController.logout.bind(authController));

  return router;
};



