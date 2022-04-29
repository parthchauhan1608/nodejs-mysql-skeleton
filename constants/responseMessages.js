// There messages are generalized. Feel free to change the messages according to you needs.
// Please do not modify/delete the existing keys, though you can add new ones :)
const responseMessages = {
    unauthorized: {
        message: "You are unauthorized for this request. Please sign in.",
        code: 401,
    },
    signedIn: {
        message: "Signed in successfully.",
        code: 200,
    },
    signedUp: {
        message: "Signed up successfully.",
        code: 201,
    },
    signInFailed: {
        message: "Sign in failed. Please try again",
        code: 500,
    },
    signUpFailed: {
        message: "Sign up failed. Please try again",
        code: 500,
    },
    invalidData: {
        message: "The data you entered is invalid.",
        code: 400,
    },
    emailRequired: {
        message: "Email address is required.",
        code: 400,
    },
    passwordRequired: {
        message: "Password is required",
        code: 400,
    },
    invalidPassword: {
        message: "Password should be minimum 8 characters long, and\
      contain atleast one lowercase letter, one uppercase letter, \
      one special character, and one digit.",
        code: 400,
    },
    invalidEmail: {
        message: "Your email address is invalid.",
        code: 400,
    },
    incorrectPassword: {
        message: "Your password is incorrect. Please enter the correct one and try again.",
        code: 400,
    },
    verificationEmailSent: {
        message: "The verification email has been sent. Please check your inbox.",
        code: 200,
    },
    verificationEmailNotSent: {
        message: "Could not send the verification email. Please make sure to enter a valid email address.",
        code: 500,
    },
    internalError: {
        message: "There was some server error. Please try again.",
        code: 500,
    },
    couldNotFetchData: {
        message: "Could not fetch data. Please try again.",
        code: 500,
    },
    fetchedDataSuccessfully: {
        message: "The data has been fetched successfully.",
        code: 200,
    },
    passwordsDoNotMatch: {
        message: "Password and confirm password do not match.",
        code: 400,
    },
    passwordShouldNotBeSame: {
        message: "Old and new passwords should not be same. Please enter a different one.",
        code: 400,
    },
    couldNotGenerateHash: {
        message: "Could not generate password hash.",
        code: 500,
    },
    invalidFileFormat: {
        message: "Please upload an image.",
        code: 400,
    },
    imageUploadFailed: {
        message: "Could not upload the image. Please try again.",
        code: 500,
    },
    tokenCreationFailed: {
        message: "Could not create the auth token. Please try again.",
        code: 500,
    },
    userUpdateFailed: {
        message: "Could not update the user. Please try again.",
        code: 500,
    },
    passwordUpdateFailed: {
        message: "Could not update your password. Please try again.",
        code: 500,
    },
    userNotFound: {
        message: "Specified user could not be found.",
        code: 404,
    },
    dataDelete: {
        message: "Data has successfully been deleted.",
        code: 200,
    },
    dataDeletionFailed: {
        message: "Could not delete the data. Please try again.",
        code: 500,
    },
    noUsers: {
        message: "There are no users to display.",
        code: 204,
    },
    invalidToken: {
        message: "The token is invalid.",
        code: 400,
    },
    userExists: {
        message: "User already exists. Please sign in.",
        code: 400,
    },
    userDoesNotExist: {
        message: "User does not exist. Please sign up.",
        code: 400,
    },
    userUpdated: {
        message: "User has been updated.",
        code: 200,
    }
};

module.exports = responseMessages;