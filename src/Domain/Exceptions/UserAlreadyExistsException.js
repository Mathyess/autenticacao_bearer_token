// src/Domain/Exceptions/UserAlreadyExistsException.js
class UserAlreadyExistsException extends Error {
  constructor(message) {
    super(message);
    this.name = "UserAlreadyExistsException";
    this.statusCode = 400; // opcional, caso queira usar para HTTP
  }
}

module.exports = UserAlreadyExistsException;

