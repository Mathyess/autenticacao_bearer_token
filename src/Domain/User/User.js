// src/Domain/User/User.js
const Name = require('./ValueObjects/Name');
const Password = require('./ValueObjects/Password');

class User {
  constructor(name, email, password, id = null) {
    this.name = new Name(name);
    this.email = email;
    this.password = new Password(password);
    this.id = id;
  }

  async comparePassword(plainPassword) {
    return await this.password.compare(plainPassword);
  }

  toObject() {
    return {
      id: this.id,
      name: this.name.value,
      email: this.email,
      password: this.password.hashedPassword
    };
  }
}

module.exports = User;
