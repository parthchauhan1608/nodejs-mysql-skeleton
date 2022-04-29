'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
console.log(env);
const config = require(__dirname + '/../../config/database.js')[env];
const db = {};
let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);
global.Op = Sequelize.Op;
console.log(config, env, process.env.MYSQL_USERNAME);
sequelize
    .authenticate()
    .then(() => {
        logger.log({
            level: 'info',
            message: `Connection(${config.database}) has been established successfully.`
        });
    })
    .catch(err => {
        console.log(err);
        logger.log({
            level: 'error',
            message: 'Unable to connect to the database:', err
        });
    });
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
global.sequelize = sequelize;
module.exports = db;
