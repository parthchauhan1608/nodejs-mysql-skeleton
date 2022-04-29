
const config = require('./config');
module.exports = {
    "development": {
        "username": config.MYSQL_USERNAME,
        "password": config.MYSQL_PASSWORD,
        "database": config.MYSQL_DATABASE,
        "host": "",
        "dialect": "mysql",
        "logging": true,
        "seederStorage": "sequelize",
        "seederStorageTableName": "SequelizeSeederMeta"
    },
    "production": {
        "username": "root",
        "password": process.env.MYSQL_PRODUCTION_PASSWORD,
        "database": "",
        "host": "",
        "dialect": "mysql",
        "logging": false,
        "pool": {
            "max": 100,
            "min": 0,
            "idle": 10000
        },
        "retry": {
            "match": [/Deadlock/i],
            "max": 5,
            "backoffBase": 1000,
            "backoffExponent": 1.5
        },
        "seederStorage": "sequelize",
        "seederStorageTableName": "SequelizeSeederMeta"
    }
};