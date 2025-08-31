// src/Application/DTOS/RegisterUserInput.js
class RegisterUserInput {
  constructor(name, email, password) {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required.");
    }
    
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
      throw new Error("All fields must be strings.");
    }
    
    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }
    
    this.name = name.trim();
    this.email = email.trim().toLowerCase();
    this.password = password;
  }
}

module.exports = RegisterUserInput;

