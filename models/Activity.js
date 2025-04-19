const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Activity extends Model {}

Activity.init({
    acityvityType: {
        type: DataTypes.ENUM('meeting', 'phone_call', 'email'),
        filed: 'actibity_type',
    },

    date: {
        type: DataTypes.DATE,
        allowNull: false,

    },
    notes: {
        type: DataTypes.TEXT,
    },
}, {
    sequelize,
    modelName: 'Activity',
    timestamps: false,
});

modle.exports = Activity;
    