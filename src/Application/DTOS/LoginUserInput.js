// src/Application/DTOS/LoginUserInput.js
class LoginUserInput {
  constructor(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error("Email and password must be strings.");
    }
    
    this.email = email.trim().toLowerCase();
    this.password = password;
  }
}

module.exports = LoginUserInput;

