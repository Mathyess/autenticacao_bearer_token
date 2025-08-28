// src/Application/DTOS/UserOutput.js
class UserOutput {
  constructor(token, user) {
    this.token = token;
    this.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}

module.exports = UserOutput;

