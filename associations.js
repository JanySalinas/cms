const { User, Customer, Activity } = require('./models');

User.hasMany(Activity, { foreignKey: 'created_by' });
Activity.belongsTo(User, { as: 'creator' });

Customer.hasMany(Activity, { foreignKey: 'customer_id' });
Activity.belongsTo(Customer);

module.exports = {
    User,
    Customer,
    Activity
};