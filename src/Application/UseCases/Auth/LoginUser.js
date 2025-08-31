// src/Application/UseCases/Auth/LoginUser.js
const UserOutput = require('@Application/DTOS/UserOutput');
const InvalidCredentialsException = require('@Domain/Exceptions/InvalidCredentialsException');

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
    
    // Verificar se o usuário tem ID válido
    if (!user.id) {
      throw new Error('User ID is required for token generation');
    }
    
    const tokenPayload = { 
      userId: user.id, 
      email: user.email.value 
    };
    
    const token = this.jwtProvider.generateToken(tokenPayload);
    
    return new UserOutput(token, {
      id: user.id,
      name: user.name.value,
      email: user.email.value
    });
  }
}

module.exports = LoginUser;

