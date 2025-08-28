// src/Infrastructure/Persistence/Sequelize/database.js
const { Sequelize } = require('sequelize');
const config = require('../../../config');

const sequelize = new Sequelize(config.db.url, {
  dialect: config.db.dialect, // 'postgres' ou 'mysql'
  logging: false, // Desabilitar logs do Sequelize para produção
});

module.exports = sequelize;

