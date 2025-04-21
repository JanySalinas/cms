const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Activity extends Model {}
Activity.init({
  id: {
    type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
  },
  type:     { type: DataTypes.ENUM('call','meeting','email'), allowNull: false },
  note:     { type: DataTypes.TEXT, allowNull: false },
  date:     { type: DataTypes.DATE, allowNull: false },
  customerId:{ type: DataTypes.INTEGER, allowNull: false },
  userId:   { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  modelName: 'Activity',
  tableName: 'Activities',
  timestamps: true
});

module.exports = Activity;