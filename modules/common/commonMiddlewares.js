const validateData = require("../../utils/validateData");
const jwt = require("../../helpers/jwt");
const responseMessages = require("../../constants/responseMessages");
const { validationResult } = require("express-validator");

const middlewares = {};

/* 
  @description check whether the user is authenticated
  @notes modify according to your needs only if required to do so
*/
middlewares.isUserAuthenticated = async(request, response, next) => {
    let token = request.headers["authorization"];
    try {
        if (validateData.isEmpty(token)) {
            throw Error(JSON.stringify(responseMessages.ERROR.unauthorized));
        }

        token = token.split(" ")[1];
        const user = jwt.verifyToken(token);

        if (validateData.isEmpty(user)) {
            throw Error(JSON.stringify(responseMessages.ERROR.unauthorized));
        }

        request.userTokenData = user;
        // request.body.email = user.email
        next();
    } catch (error) {

        console.log("commonMiddleware.isUserAuthenticated ", error)

        const errorMessage = JSON.parse(error.message);
        const code = errorMessage && errorMessage.code;
        const message = errorMessage && errorMessage.message;

        return response.status(code).json({
            message
        });
    }
};

/* 
  @description checks whether there are errors in request
  @notes modify according to your needs only if required to do so
*/
middlewares.checkForErrors = async(request, response, next) => {
    const errors = validationResult(request);

    try {
        if (validateData.isEmpty(errors) || validateData.isEmpty(errors.array())) {
            return next();
        }

        throw Error(JSON.stringify({ code: 400, message: errors.array()[0].msg }));
    } catch (error) {
        console.log("commonMiddlewares.checkForErrors", error);
        const errorMessage = JSON.parse(error.message);
        const code = errorMessage && errorMessage.code;
        const message = errorMessage && errorMessage.message;

        return response.status(code).json({
            message,
        });
    }
};

module.exports = middlewares