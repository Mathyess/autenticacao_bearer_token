// src/Domain/User/ValueObjects/Name.js
class Name {
  constructor(value) {
    if (!value || typeof value !== 'string' || value.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    
    if (value.trim().length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }
    
    // Normalizar: remover espaços extras e capitalizar
    this.value = value.trim();
  }
}

module.exports = Name;



