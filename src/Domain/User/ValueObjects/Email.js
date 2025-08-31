// src/Domain/User/ValueObjects/Email.js
class Email {
  constructor(value) {
    if (!value || !this.isValidEmail(value)) {
      throw new Error('Invalid email format');
    }
    this.value = value.toLowerCase().trim();
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

module.exports = Email;


