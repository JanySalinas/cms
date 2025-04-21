const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Customer extends Model {}
Customer.init({
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
  },
  name:      { type: DataTypes.STRING, allowNull: false },
  email:     { type: DataTypes.STRING, allowNull: false, unique: true },
  company:   { type: DataTypes.STRING },
  phone:     { type: DataTypes.STRING },
  status:    { type: DataTypes.ENUM('active','inactive','lead'), defaultValue: 'active' },
  assignedTo:{ type: DataTypes.INTEGER, allowNull: true }
}, {
  sequelize,
  modelName: 'Customer',
  tableName: 'Customers',
  timestamps: true
});

module.exports = Customer;