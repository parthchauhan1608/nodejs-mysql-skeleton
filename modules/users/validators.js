const { body } = require("express-validator");
const responseMessages = require("../../constants/responseMessages");

const validators = {};

/* 
  @description checks the validity of email
  @notes feel free to modify this according to your needs
*/
validators.isEmailValid = () => {
  return body("email")
  .isEmail()
  .withMessage(responseMessages.invalidEmail);
}

/* 
  @description checks the validity of password
  @notes feel free to modify this according to your needs
*/
validators.isPasswordValid = () => {
  return body("password")
  .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")
  .withMessage(responseMessages.invalidPassword);
}

module.exports = validators;