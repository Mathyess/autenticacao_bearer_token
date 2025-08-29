// src/Infrastructure/Persistence/Sequelize/database.js
const { Sequelize } = require('sequelize');
const config = require('@config');

let sequelize;

if (config.db.dialect === 'sqlite') {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.db.url,
    logging: false,
  });
} else {
  sequelize = new Sequelize(config.db.url, {
    dialect: config.db.dialect,
    logging: false,
  });
}

module.exports = sequelize;

