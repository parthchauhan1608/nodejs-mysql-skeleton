const { Sequelize, DataTypes, Op } = require("sequelize");
require("dotenv").config();
console.log(typeof process.env.DB_POOL_MIN)
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DIALECT,
        operatorsAliases: 0,

        pool: {
            max: parseInt(process.env.DB_POOL_MAX),
            min: parseInt(process.env.DB_POOL_MIN),
            acquire: parseInt(process.env.DB_POOL_ACQUIRE),
            idle: parseInt(process.env.DB_POOL_IDLE)
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize, DataTypes);

module.exports = db;