// src/Domain/User/ValueObjects/Password.js
const bcrypt = require('bcryptjs'); // Para hashing

class Password {
  constructor(value, isHashed = false) {
    if (!value) {
      throw new Error("Password cannot be empty.");
    }
    
    if (!isHashed && value.length < 6) {
      throw new Error("Password must be at least 6 characters long."); // Exemplo de regra de negócio: min 6 caracteres
    }
    
    this.hashedPassword = isHashed ? value : this.hash(value);
  }

  hash(plainPassword) {
    // Sincrono para simplificar, mas idealmente usar bcrypt.hash assincrono
    return bcrypt.hashSync(plainPassword, 10);
  }

  async compare(plainPassword) {
    return await bcrypt.compare(plainPassword, this.hashedPassword);
  }

  equals(otherPassword) {
    return otherPassword instanceof Password && this.hashedPassword === otherPassword.hashedPassword;
  }
}

module.exports = Password;



