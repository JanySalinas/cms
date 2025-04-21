const sequelize = require('../config/database');
const Customer  = require('./Customer');
const Activity  = require('./Activity');
const User      = require('./user');

// Associations
Customer.hasMany(Activity, { foreignKey: 'customerId' });
Activity.belongsTo(Customer, { foreignKey: 'customerId' });

User.hasMany(Activity,     { foreignKey: 'userId' });
Activity.belongsTo(User,   { foreignKey: 'userId' });

module.exports = { sequelize, Customer, Activity, User };