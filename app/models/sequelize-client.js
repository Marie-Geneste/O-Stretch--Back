require("dotenv/config");

const { Sequelize } = require('sequelize');

// Ceci est une instance de connexion à la BDD Postgres (c'est notre "client")
const sequelize = new Sequelize(process.env.PG_URL, {
    dialect: "postgres",
    define: {
        timestamps: false
    }
});


module.exports = sequelize;
