const express = require("express");
const middlewares = require("./middlewares");
const controllers = require("./controllers");
const validators = require("./validators");
const commonMiddlewares = require("../common/commonMiddlewares");

const router = express.Router();

const signInMiddlewares = [
  validators.isEmailValid(),
  validators.isPasswordValid(),
  commonMiddlewares.validationHandler,
  middlewares.doesUserExist,
  controllers.signIn,
];
router.post("/signin", signInMiddlewares);

const signupMiddlewares = [
  validators.isEmailValid(),
  validators.isPasswordValid(),
  commonMiddlewares.validationHandler,
  middlewares.doesUserExist,
  controllers.signUp,
];
router.post("/signup", signupMiddlewares);

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

const getUserMiddlewares = [
  commonMiddlewares.isUserAuthenticated,
  controllers.getUser,
];
router.get("/:id", getUserMiddlewares);

module.exports = router;