const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Pelicula = sequelize.define('Pelicula', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  año: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'peliculas',
  timestamps: false
});

module.exports = Pelicula;
