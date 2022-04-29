const responseMessages = require("../../constants/responseMessages");
const jwt = require("../../helpers/jwt");
const utils = require("../../helpers/utils");
const { doesUserExist } = require("./middlewares");
const services = require("./services");

const controllers = {};

/**
  @url POST api/v1/users/signin
  @description signs the user in
  @access public
*/
controllers.signIn = async (request, response) => {
  const { doesUserExist, user } = request;
  const { password } = request.body;

  try {
    if (!doesUserExist) {
      throw Error(JSON.stringify(responseMessages.userDoesNotExist));
    }

    const isPasswordCorrect = await utils.compareHash(user.password, password);

    if (isPasswordCorrect) {
      delete user.password;

      const token = jwt.signToken({ email: user.email, id: user._id });

      return response.status(responseMessages.signedIn.code).json({
        user,
        token,
        message: responseMessages.signedIn.message,
      });
    }

    throw Error(JSON.stringify(responseMessages.incorrectPassword));
  } catch (error) {
    console.log("user/controllers.signin", error);
    const errorMessage = JSON.parse(error.message);
    const code = errorMessage && errorMessage.code;
    const message = errorMessage && errorMessage.message;

    return response
      .status(code)
      .json({
        message
      });
  }
};

/* 
  @url POST api/v1/users/signup
  @description signs the user up
  @access public
*/
controllers.signUp = async (request, response) => {
  const { doesUserExist, user } = request;
  const data = request.body;

  try {
    if (doesUserExist) {
      throw Error(JSON.stringify(responseMessages.userExists));
    }

    data.password = await utils.createHash(data.password);

    const newUser = await services.createUser(data);

    if (utils.isEmpty(newUser)) {
      throw Error(JSON.stringify(responseMessages.signUpFailed));
    }

    const token = jwt.signToken({ email: newUser.email, id: newUser._id });

    delete newUser.password;

    return response.status(responseMessages.signedUp.code).json({
      newUser,
      token,
      message: responseMessages.signedUp.message,
    });
  } catch (error) {
    console.log("user/controllers.signup", error);

    const errorMessage = error.message && JSON.parse(error.message);
    const code = errorMessage && errorMessage.code;
    const message = errorMessage && errorMessage.message;

    return response
      .status(code)
      .json({
        message
      });
  }
};

/* 
  @url PUT api/v1/user/update-user
  @description updates a user
  @access private
*/
controllers.updateUser = async (request, response) => {
  const user = request.user;
  const data = request.body;

  try {
    if (!doesUserExist || utils.isEmpty(user.id)) {
      throw Error(JSON.stringify(responseMessages.userDoesNotExist));
    }

    const updatedUser = await services.updateUser(user.id, data);

    if (utils.isEmpty(updatedUser)) {
      throw Error(JSON.stringify(responseMessages.userUpdateFailed));
    }

    return response.status(responseMessages.userUpdated.code).json({
      user: updatedUser,
      message: responseMessages.userUpdated.message
    });
  } catch (error) {
    console.log("user/controllers.updateUser", error);

    const errorMessage = error.message && JSON.parse(error.message);
    const code = errorMessage && errorMessage.code;
    const message = errorMessage && errorMessage.message;

    return response
      .status(code)
      .json({
        message
      });
  }
};

/* 
  @url GET api/v1/user/:id
  @description fetches a given user
  @access private
*/
controllers.getUser = async (request, response) => {
  const { id } = request.params;

  try {
    if (utils.isEmpty(id)) {
      throw Error(JSON.stringify(responseMessages.invalidData));
    }

    const user = await services.getUser({ _id: id }, "-password");

    if (utils.isEmpty(user)) {
      throw Error(JSON.stringify(responseMessages.userNotFound));
    }

    return response.status(responseMessages.fetchedDataSuccessfully.code).json({
      user,
      message: responseMessages.fetchedDataSuccessfully.message
    });
  } catch (error) {
    console.log("user/controllers.getUser", error);

    const errorMessage = error.message && JSON.parse(error.message);
    const code = errorMessage && errorMessage.code;
    const message = errorMessage && errorMessage.message;

    return response
      .status(code)
      .json({
        message
      });
  }
};

/* 
  @url GET api/v1/user/all
  @description fetches all the users
  @access private
*/
controllers.getAllUsers = async (request, response) => {
  try {
    const users = await services.getUsers({}, "-password");

    if (utils.isEmpty(users)) {
      throw Error(JSON.stringify(responseMessages.userNotFound));
    }

    return response.status(responseMessages.fetchedDataSuccessfully.code).json({
      users,
      message: responseMessages.fetchedDataSuccessfully.message
    });
  } catch (error) {
    console.log("user/controllers.getAllUsers", error);

    const errorMessage = error.message && JSON.parse(error.message);
    const code = errorMessage && errorMessage.code;
    const message = errorMessage && errorMessage.message;

    return response
      .status(code)
      .json({
        message
      });
  }
};

module.exports = controllers;