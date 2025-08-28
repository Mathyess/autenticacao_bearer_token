// src/Application/DTOS/LoginUserInput.js
class LoginUserInput {
  constructor(email, password) {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    this.email = email;
    this.password = password;
  }
}

module.exports = LoginUserInput;

