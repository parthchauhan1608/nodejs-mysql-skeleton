const bcrypt = require("bcrypt");

const utils = {};

/**
  @description check whether the passed data is filled in
  @params data - the data that needs to be checked
  @notes you can modify this according to your needs as this is generalized.
*/
utils.isEmpty = (data) => {
  const emptyDataIdentifiers = [null, 0, "", undefined, "undefined", false, "0"];
  if (emptyDataIdentifiers.includes(typeof data)) {
    return true;
  }
  if (emptyDataIdentifiers.includes(data)) {
    return true;
  }
  if (typeof data === "object") {
    const keys = Object.keys(data);
    if (!keys.length) {
      return true;
    }
  }
  return false;
};


/**
  @description creates a password hash
  @params password - plaintext password as input by user
  @notes modify according to your needs only if required to do so
*/
utils.createHash = async (data) => {
  const salt = await bcrypt.genSalt(Number(global.config.HASH_SALT_ROUNDS));
  return bcrypt.hash(data, salt);
};

/**
@description compares two given passwords
@params password - hashed password fetched from the database
        givenPassword - plaintext password as input by user
@notes modify according to your needs only if required to do so
*/
utils.compareHash = async (data, hash) => {
  return bcrypt.compare(hash, data);
};

module.exports = utils;