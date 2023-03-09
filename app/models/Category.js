const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./sequelize-client');

class Category extends Sequelize.Model {}


Category.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'category',
    }
);

module.exports = Category;
