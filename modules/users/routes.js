const express = require("express");
const controllers = require('./controllets');
const validators = require('./validators');
const commonMiddlewares = require('../common/commonMiddlewares');
const middlewares = require('./middlewares');
const router = express.Router();

/**
 * user signup route
 */
const signupMiddlewares = [
    validators.isEmailValid(),
    validators.isPasswordValid(),
    commonMiddlewares.checkForErrors,
    middlewares.doesUserExist,
    controllers.signUp,
];
router.post("/signup", signupMiddlewares);

const signInMiddlewares = [
    validators.isEmailValid(),
    validators.isPasswordValid(),
    commonMiddlewares.checkForErrors,
    middlewares.doesUserExist,
    controllers.signIn,
]
router.post("/signin", signInMiddlewares);

const updateUserMiddlewares = [
    commonMiddlewares.isUserAuthenticated,
    middlewares.doesUserExist,
    controllers.updateUser,
];
router.put("/update-user", updateUserMiddlewares);

const getAllUsersMiddlewares = [
    commonMiddlewares.isUserAuthenticated,
    controllers.getAllUsers
];
router.get("/all", getAllUsersMiddlewares);

module.exports = router;