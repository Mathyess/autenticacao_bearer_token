// src/config/config.js
// Importa a configuração da sua aplicação para o Sequelize CLI
const appConfig = require('./index.js');

module.exports = {
  development: { url: appConfig.db.url, dialect: appConfig.db.dialect },
  test: { url: appConfig.db.url, dialect: appConfig.db.dialect },
  production: { url: appConfig.db.url, dialect: appConfig.db.dialect },
};

