const config = {};

config.MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
config.MORGAN_LOGGING_MODE = process.env.MORGAN_LOGGING_MODE;
config.PORT = process.env.PORT;
config.JWT_SECRET = process.env.JWT_SECRET;
config.HASH_SALT_ROUNDS = process.env.HASH_SALT_ROUNDS;


config.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
config.MYSQL_USERNAME = process.env.MYSQL_USERNAME;
config.MYSQL_DATABASE = process.env.MYSQL_DATABASE;


module.exports = config;