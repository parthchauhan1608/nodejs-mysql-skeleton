const responseMessages = {
    ERROR: {
        internalError: {
            message: "There was some server error. Please try again.",
            code: 500,
        },
        passwordRequired: {
            message: "Password is required",
            code: 400,
        },
        signUpFailed: {
            message: "Sign up failed. Please try again",
            code: 500,
        },
        userExists: {
            message: "User already exists. Please sign in.",
            code: 400,
        },
        invalidData: {
            message: "The data you entered is invalid.",
            code: 400,
        },
        tokenCreationFailed: {
            message: "Could not create the auth token. Please try again.",
            code: 500,
        },
        unauthorized: {
            message: "You are unauthorized for this request. Please sign in.",
            code: 401,
        },
        invalidEmail: {
            message: "Your email address is invalid.",
            code: 400,
        },
        invalidPassword: {
            message: "Password should be minimum 8 characters long, and\
        contain atleast one lowercase letter, one uppercase letter, \
        one special character, and one digit.",
            code: 400,
        },
        userDoesNotExist: {
            message: "User does not exist. Please sign up.",
            code: 400,
        },
        userUpdateFailed: {
            message: "Could not update the user. Please try again.",
            code: 500,
        },
        userNotFound: {
            message: "Specified user could not be found.",
            code: 404,
        },
    },
    SUCCESS: {
        signedUp: {
            message: "Signed up successfully.",
            code: 201,
        },
        signedIn: {
            message: "Signed in successfully.",
            code: 200,
        },
        userUpdated: {
            message: "User has been updated.",
            code: 200,
        },
        fetchedDataSuccessfully: {
            message: "The data has been fetched successfully.",
            code: 200,
        },
    }
};

module.exports = responseMessages;