const bcrypt = require("bcrypt");
const responseMessages = require("../constants/responseMessages");
const validateData = require("../utils/validateData");

const password = {};

/* 
  @description creates a password hash
  @params password - plaintext password as input by user
  @notes modify according to your needs only if required to do so
*/
password.createPasswordHash = async(password) => {
    if (validateData.isEmpty(password)) {
        throw Error(JSON.stringify(responseMessages.ERROR.passwordRequired));
    }

    const passwordSalt = await bcrypt.genSalt(Number(process.env.HASH_SALT_ROUNDS));
    const passwordHash = await bcrypt.hash(password, passwordSalt);

    if (validateData.isEmpty(passwordHash)) {
        throw Error(JSON.stringify(responseMessages.ERROR.internalError));
    }

    return passwordHash;
}

/* 
  @description compares two given passwords
  @params password - hashed password fetched from the database
          givenPassword - plaintext password as input by user
  @notes modify according to your needs only if required to do so
*/
password.comparePasswords = async(password, givenPassword) => {
    if (validateData.isEmpty(password) || validateData.isEmpty(givenPassword)) {
        throw Error(JSON.stringify(responseMessages.ERROR.passwordRequired));
    }

    const doPasswordsMatch = await bcrypt.compare(givenPassword, password);

    if (doPasswordsMatch) {
        return true;
    }

    return false;
}

module.exports = password;