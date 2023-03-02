const { Model, DataTypes } = require("sequelize");
const sequelize = require("./sequelize-client");

class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    biography: {
        type: DataTypes.STRING
    },
    role_id: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    tableName: "user"
});

// User.getFavorites = function (user_id){ 
//     //requete à la main
// }

module.exports = User;
