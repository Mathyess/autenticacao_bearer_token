// src/Infrastructure/Express/controllers/AuthController.js
const RegisterUserInput = require('../../Application/DTOS/RegisterUserInput');
const LoginUserInput = require('../../Application/DTOS/LoginUserInput');
// Importar Use Cases injetados pelo app.js

class AuthController {
  constructor(registerUserUseCase, loginUserUseCase) {
    this.registerUserUseCase = registerUserUseCase;
    this.loginUserUseCase = loginUserUseCase;
  }

  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const input = new RegisterUserInput(name, email, password);
      const userOutput = await this.registerUserUseCase.execute(input);
      return res.status(201).json(userOutput);
    } catch (error) {
      next(error); // Encaminha para o middleware de tratamento de erros
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const input = new LoginUserInput(email, password);
      const authOutput = await this.loginUserUseCase.execute(input);
      return res.status(200).json(authOutput);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      // Aqui você precisaria de um Use Case ou lógica de aplicação para invalidar o token.
      // Por exemplo:
      // const token = req.headers.authorization.split(' ')[1];
      // await this.logoutUserUseCase.execute(token);
      return res.status(200).json({ message: 'Logged out successfully.' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;



