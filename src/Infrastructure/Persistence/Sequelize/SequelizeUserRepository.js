// src/Infrastructure/Persistence/Sequelize/SequelizeUserRepository.js
const UserModel = require('./models/UserModel');
const User = require('@Domain/User/User');

class SequelizeUserRepository {
  async save(user) {
    const userData = user.toObject();
    console.log('Debug - User data to save:', userData);
    
    const savedUser = await UserModel.create(userData);
    console.log('Debug - User saved in DB:', {
      id: savedUser.id,
      name: savedUser.name,
      email: savedUser.email,
      hasPassword: !!savedUser.password
    });
    
    // Criar um objeto User com os valores brutos do banco
    const userInstance = new User(
      savedUser.name,        // string
      savedUser.email,       // string
      savedUser.password,    // string (hash)
      savedUser.id          // UUID
    );
    
    // Corrigir a senha para indicar que já está hasheada
    userInstance.password = new (require('@Domain/User/ValueObjects/Password'))(savedUser.password, true);
    
    console.log('Debug - User instance created in save:', {
      id: userInstance.id,
      name: userInstance.name?.value,
      email: userInstance.email?.value
    });
    
    return userInstance;
  }

  async findById(id) {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    
    // Criar um objeto User com a senha já hasheada
    const userInstance = new User(
      user.name,
      user.email,
      user.password,
      user.id
    );
    
    // Corrigir a senha para indicar que já está hasheada
    userInstance.password = new (require('@Domain/User/ValueObjects/Password'))(user.password, true);
    
    return userInstance;
  }

  async findByEmail(email) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return null;
    
    // Debug: verificar se o usuário tem ID
    console.log('Debug - User from DB:', {
      id: user.id,
      name: user.name,
      email: user.email,
      hasPassword: !!user.password
    });
    
    // Criar um objeto User com a senha já hasheada
    const userInstance = new User(
      user.name,
      user.email,
      user.password,
      user.id
    );
    
    // Corrigir a senha para indicar que já está hasheada
    userInstance.password = new (require('@Domain/User/ValueObjects/Password'))(user.password, true);
    
    // Debug: verificar se o objeto User foi criado corretamente
    console.log('Debug - User instance created:', {
      id: userInstance.id,
      name: userInstance.name?.value,
      email: userInstance.email?.value
    });
    
    return userInstance;
  }
}

module.exports = SequelizeUserRepository;



