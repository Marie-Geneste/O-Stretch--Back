const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class Favorite extends Model {}

Favorite.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    stretches_id: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    tableName: "user"
});


module.exports = Favorite;



