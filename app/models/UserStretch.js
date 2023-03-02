const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class UserStretch extends Model {}

UserStretch.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    stretches_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "user_stretch"
});


module.exports = UserStretch;



