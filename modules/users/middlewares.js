const utils = require("../../helpers/utils");
const services = require("./services");

const middlewares = {};

/**
  @description checked whether the user exists
  @notes modify according to your needs only if required to do so
*/
middlewares.doesUserExist = async (request, response, next) => {
  let { email } = request.body;

  if (utils.isEmpty(email)) {
    email = request.userTokenData.email;
  }

  try {
    const query = { email };
    const user = await services.getUser(query);

    if (utils.isEmpty(user)) {
      request.doesUserExist = false;
    } else {
      request.doesUserExist = true;
      request.user = user;
    }

    next();
  } catch (error) {
    console.log("user/middlewares.doesUserExist", error);
    const errorMessage = JSON.parse(error.message);
    const code = errorMessage && errorMessage.code;
    const message = errorMessage && errorMessage.message;

    return response.status(code).json({
      message
    });
  }
};

module.exports = middlewares;