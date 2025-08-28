// src/Infrastructure/Express/routes/auth.routes.js
const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const validate = require('../middlewares/validationMiddleware');
const { registerSchema, loginSchema } = require('../validationSchemas/authSchemas');

module.exports = (registerUserUseCase, loginUserUseCase) => {
  const router = Router();
  const authController = new AuthController(registerUserUseCase, loginUserUseCase);

  router.post('/register', validate(registerSchema), authController.register.bind(authController));
  router.post('/login', validate(loginSchema), authController.login.bind(authController));

  return router;
};



