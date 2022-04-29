const utils = require("../../helpers/utils");
const responseMessages = require("../../constants/responseMessages");

const services = {};

/* 
  @description fetches a user from the database
  @params query - query for fetching the user
*/
services.getUser = async (query, deselect) => {

  return 'user';
};

services.getUsers = async (query) => {

  return 'users';
};

services.createUser = async (user) => {

  return 'newUser';
};

services.updateUser = async (id, updatedUser) => {

  return 'user';
};

module.exports = services;