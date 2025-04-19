const  {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Customer extends Model {}

Customer.init({
    companyName: {
        type: DataTypes.STRING,
        filed: 'companyName',
    },
    contactPerson: {
        type: DataTypes.STRING,
        filed: 'contactPerson',
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
    },
},{
    sequelize,
    modelName: 'Customer',
    timestamps: true,
});

module.exports = Customer;