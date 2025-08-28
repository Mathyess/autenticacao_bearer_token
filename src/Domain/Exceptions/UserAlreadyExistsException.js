// src/Domain/Exceptions/UserAlreadyExistsException.js
class UserAlreadyExistsException extends Error {
  constructor(message) {
    super(message);
    this.name = "UserAlreadyExistsException";
    this.statusCode = 409; // Conflict - usuário já existe
  }
}

module.exports = UserAlreadyExistsException;

