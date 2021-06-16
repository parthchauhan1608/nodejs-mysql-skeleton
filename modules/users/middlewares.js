const validateData = require("../../utils/validateData");
const services = require("./services");

const middlewares = {};

/* 
  @description checked whether the user exists
  @notes modify according to your needs only if required to do so
*/
middlewares.doesUserExist = async(request, response, next) => {
    let { email } = request.body;
    // if email is not found in the request body 
    // then fallback to the token data 
    if (validateData.isEmpty(email)) {
        email = request.userTokenData.email;
    }

    try {
        const query = {
            where: {
                email
            }
        };
        const user = await services.getUser(query);

        if (validateData.isEmpty(user)) {
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
}

module.exports = middlewares;