// src/Application/DTOS/RegisterUserInput.js
class RegisterUserInput {
  constructor(name, email, password) {
    if (!name || !email || !password) {
      throw new Error("Name, email, and password are required.");
    }
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

module.exports = RegisterUserInput;

