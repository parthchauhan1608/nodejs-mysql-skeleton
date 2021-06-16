const passwordHelper = require('../../helpers/password');
const responseMessages = require('../../constants/responseMessages');
const validateData = require('../../utils/validateData');
const jwt = require('../../helpers/jwt');
const services = require("./services");

const controllers = {};

/* 
  @url POST api/v1/users/signup
  @description signs the user up
  @access public
*/
controllers.signUp = async(request, response) => {
    const { doesUserExist, user } = request;
    const data = request.body;

    try {
        if (doesUserExist) {
            throw Error(JSON.stringify(responseMessages.ERROR.userExists));
        }

        data.password = await passwordHelper.createPasswordHash(data.password);

        const newUser = await services.createUser(data);

        if (validateData.isEmpty(newUser)) {
            throw Error(JSON.stringify(responseMessages.ERROR.signUpFailed));
        }

        const token = jwt.signToken({ email: newUser.email, id: newUser.id });

        delete newUser.password;

        return response.status(responseMessages.SUCCESS.signedUp.code).json({
            newUser,
            token,
            message: responseMessages.SUCCESS.signedUp.message,
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
}

/* 
  @url POST api/v1/users/signin
  @description signs the user in
  @access public
*/
controllers.signIn = async(request, response) => {
    const { doesUserExist, user } = request;
    const { password } = request.body;

    try {
        if (!doesUserExist) {
            throw Error(JSON.stringify(responseMessages.ERROR.userDoesNotExist));
        }
        const isPasswordCorrect = await passwordHelper.comparePasswords(user.password, password);
        if (isPasswordCorrect) {
            delete user.password;

            const token = jwt.signToken({ email: user.email, id: user.id });

            return response.status(responseMessages.SUCCESS.signedIn.code).json({
                user,
                token,
                message: responseMessages.SUCCESS.signedIn.message,
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
}

/* 
  @url PUT api/v1/user/update-user
  @description updates a user
  @access private
*/
controllers.updateUser = async(request, response) => {
    const data = request.body;
    const { doesUserExist, user } = request;

    try {
        if (!doesUserExist || validateData.isEmpty(user.id)) {
            throw Error(JSON.stringify(responseMessages.ERROR.userDoesNotExist));
        }

        let query = {
            where: {
                id: user.id
            }
        }
        const updatedUser = await services.updateUser(query, data, { new: true });

        if (validateData.isEmpty(updatedUser)) {
            throw Error(JSON.stringify(responseMessages.ERROR.userUpdateFailed));
        }

        return response.status(responseMessages.SUCCESS.userUpdated.code).json({
            user: updatedUser,
            message: responseMessages.SUCCESS.userUpdated.message
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
}

/* 
  @url GET api/v1/user/all
  @description fetches all the users
  @access private
*/
controllers.getAllUsers = async(request, response) => {
    try {
        const users = await services.getUsers({}, "-password");

        if (validateData.isEmpty(users)) {
            throw Error(JSON.stringify(responseMessages.ERROR.userNotFound));
        }

        return response.status(responseMessages.SUCCESS.fetchedDataSuccessfully.code).json({
            users,
            message: responseMessages.SUCCESS.fetchedDataSuccessfully.message
        })
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
}

module.exports = controllers;