// src/Application/UseCases/Auth/RegisterUser.js
const User = require('@Domain/User/User');
const UserAlreadyExistsException = require('@Domain/Exceptions/UserAlreadyExistsException');

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository; // IUserRepository
  }

  async execute(input) {
    // input é RegisterUserInput
    const existingUser = await this.userRepository.findByEmail(input.email);
    
    if (existingUser) {
      throw new UserAlreadyExistsException('User with this email already exists.');
    }
    
    const user = new User(input.name, input.email, input.password);
    
    const savedUser = await this.userRepository.save(user);
    
    return {
      id: savedUser.id,
      name: savedUser.name.value,
      email: savedUser.email.value
    };
  }
}

module.exports = RegisterUser;

