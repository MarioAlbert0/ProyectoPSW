// Ejemplo simple para queries directas
// Este es solo un placeholder

//module.exports = {
//  table: 'usuarios'
//};

// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // este archivo lo necesitas crear también

const User = sequelize.define('User', {
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = User;
