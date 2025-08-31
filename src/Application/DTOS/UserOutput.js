// src/Application/DTOS/UserOutput.js
class UserOutput {
  constructor(token, user) {
    if (!token) {
      throw new Error('Token is required');
    }
    
    if (!user || !user.id || !user.name || !user.email) {
      throw new Error('User data is required');
    }
    
    this.token = token;
    this.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };
  }
}

module.exports = UserOutput;

