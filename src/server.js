// src/server.js
const app = require('./app');
const sequelize = require('./Infrastructure/Persistence/Sequelize/database');
const UserModel = require('./Infrastructure/Persistence/Sequelize/models/UserModel'); // Importe para sincronizar
const { connectRedis } = require('./Infrastructure/Persistence/Redis/RedisClient');
const config = require('./config/index');
const PORT = config.server.port;

async function startServer() {
  try {
    // Sincroniza modelos com o banco de dados (ideal para desenvolvimento)
    // Em produção, use migrações (npx sequelize-cli db:migrate)
    await sequelize.authenticate(); // Testa a conexão
    await sequelize.sync({ alter: true }); // Cria tabelas se não existirem ou altera
    console.log('Database connected and synchronized!');
    
    await connectRedis(); // Conecta ao Redis
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Access API at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1); // Sai do processo com erro
  }
}

startServer();



