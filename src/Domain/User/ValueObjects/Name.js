// src/Domain/User/ValueObjects/Name.js
class Name {
  constructor(value) {
    // Normalizar: remover espaços extras e capitalizar
    this.value = value.trim();
  }
}

module.exports = Name;



