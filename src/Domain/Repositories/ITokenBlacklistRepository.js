// src/Domain/Repositories/ITokenBlacklistRepository.js
class ITokenBlacklistRepository {
  async add(token, expiresIn) {
    throw new Error("Method 'add' must be implemented.");
  }

  async exists(token) {
    throw new Error("Method 'exists' must be implemented.");
  }
}

module.exports = ITokenBlacklistRepository;

