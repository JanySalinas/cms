const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
  },
  name: {
    type: DataTypes.STRING, allowNull: false
  },
  email: {
    type: DataTypes.STRING, allowNull: false, unique: true
  },
  passwordHash: {
    type: DataTypes.STRING, allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin','sales','support'), allowNull: false, defaultValue: 'sales'
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
  timestamps: true
});

module.exports = User;