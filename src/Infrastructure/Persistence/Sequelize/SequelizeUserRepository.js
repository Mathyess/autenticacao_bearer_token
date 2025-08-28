// src/Infrastructure/Persistence/Sequelize/SequelizeUserRepository.js
const UserModel = require('./models/UserModel');
const User = require('@Domain/User/User');

class SequelizeUserRepository {
  async save(user) {
    const userData = user.toObject();
    const savedUser = await UserModel.create(userData);
    return new User(
      savedUser.name,
      savedUser.email,
      savedUser.password,
      savedUser.id
    );
  }

  async findById(id) {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    
    return new User(
      user.name,
      user.email,
      user.password,
      user.id
    );
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return null;
    
    return new User(
      user.name,
      user.email,
      user.password,
      user.id
    );
  }
}

module.exports = SequelizeUserRepository;



