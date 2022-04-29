const utils = require("../../helpers/utils");
const jwt = require("../../helpers/jwt");
const { validationResult } = require("express-validator");
const { SERVERERROR, UNAUTHORISED, ERROR400 } = require('../../constants/common');

const middlewares = {};

/**
  @description check whether the user is authenticated
  @notes modify according to your needs only if required to do so
*/
middlewares.isUserAuthenticated = async (request, response, next) => {
  try {
    global.logger.info(`middlewares.isUserAuthenticated`);
    let token = request.headers["authorization"] || '';
    const userData = jwt.verifyToken(token);
    if (utils.isEmpty(userData)) {
      return response.status(UNAUTHORISED.CODE).send({
        status: false,
        message: global.t(UNAUTHORISED.MESSAGE)
      });
    }
    request.userTokenData = userData;
    next();
  } catch (error) {
    global.logger.error(`middlewares.isUserAuthenticated ${error}`);
    return response.status(SERVERERROR.CODE).send({
      status: false,
      message: global.t(SERVERERROR.MESSAGE)
    });
  }
};

/** 
  @description checks whether there are errors in request
  @notes modify according to your needs only if required to do so
*/
middlewares.validationHandler = async (request, response, next) => {
  try {
    global.logger.info(`middlewares.validationHandler`);
    const errors = validationResult(request);
    if (!utils.isEmpty(errors)) {
      return response.status(ERROR400).send({
        status: false,
        message: errors.array()[0].msg
      });
    }
    return next();
  } catch (error) {
    global.logger.error(`middlewares.validationHandler ${error}`);
    return response.status(SERVERERROR.CODE).send({
      status: false,
      message: global.t(SERVERERROR.MESSAGE)
    });
  }
};

module.exports = middlewares;
