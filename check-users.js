// check-users.js
const { Sequelize } = require('sequelize');

// Conectar ao banco SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

async function checkUsers() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado ao banco de dados');
    
    // Verificar se a tabela users existe
    const [results] = await sequelize.query("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
    if (results.length === 0) {
      console.log('❌ Tabela users não existe');
      return;
    }
    
    console.log('✅ Tabela users existe');
    
    // Verificar estrutura da tabela
    const [columns] = await sequelize.query("PRAGMA table_info(users)");
    console.log('\n📋 Estrutura da tabela users:');
    columns.forEach(col => {
      console.log(`  - ${col.name}: ${col.type} ${col.notnull ? 'NOT NULL' : ''} ${col.pk ? 'PRIMARY KEY' : ''}`);
    });
    
    // Verificar usuários existentes
    const [users] = await sequelize.query("SELECT * FROM users");
    console.log('\n👥 Usuários existentes:');
    if (users.length === 0) {
      console.log('  Nenhum usuário encontrado');
    } else {
      users.forEach((user, index) => {
        console.log(`  ${index + 1}. ID: ${user.id}, Nome: ${user.name}, Email: ${user.email}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkUsers();

