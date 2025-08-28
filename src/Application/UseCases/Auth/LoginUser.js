// src/Application/UseCases/Auth/LoginUser.js
const UserOutput = require('../../DTOS/UserOutput');
const InvalidCredentialsException = require('../../../Domain/Exceptions/InvalidCredentialsException');

class LoginUser {
  constructor(userRepository, jwtProvider) {
    this.userRepository = userRepository;
    this.jwtProvider = jwtProvider;
  }

  async execute(input) {
    // 'input' é uma instância de LoginUserInput
    const user = await this.userRepository.findByEmail(input.email);
    
    if (!user) {
      throw new InvalidCredentialsException('Invalid email or password.');
    }
    
    const isPasswordValid = await user.comparePassword(input.password);
    
    if (!isPasswordValid) {
      throw new InvalidCredentialsException('Invalid email or password.');
    }
    
    const token = this.jwtProvider.generateToken({ userId: user.id, email: user.email.value });
    
    return new UserOutput(token, {
      id: user.id,
      name: user.name.value,
      email: user.email.value
    });
  }
}

module.exports = LoginUser;

