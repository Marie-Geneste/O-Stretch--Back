const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client');

class Role extends Sequelize.Model {}

Role.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'roles',
    }
);

module.exports = Role;
