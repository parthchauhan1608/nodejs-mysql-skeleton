const db = require('../../models');
const User = db.user;
const Op = db.Op;
const services = {};

/* 
  @description fetches a user from the database
  @params query - query for fetching the user
*/
services.getUser = async(query) => {
    const user = await User.findOne(query)

    return user;
}

services.getUsers = async(query) => {
    const users = await User.findAll(query);

    return users;
}

services.createUser = async(user) => {
    const newUser = await User.create(user);

    return newUser;
}

services.updateUser = async(query, updatedUser, options) => {
    console.log({ query, updatedUser })
    const user = await User.update(updatedUser, query, options);

    return user;
}

module.exports = services;