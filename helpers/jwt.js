const jsonwebtoken = require("jsonwebtoken");

const jwt = {};

jwt.signToken = (data, expiresIn = null) => {
  return jsonwebtoken.sign(
    data,
    global.config.JWT_SECRET,
    {
      expiresIn: expiresIn ? expiresIn : '1h'
    }
  );
};

jwt.verifyToken = (token) => {
  let decoded = {};
  if (token) {
    try {
      decoded = jsonwebtoken.verify(
        token,
        jwtUtil.publicKEY,
        {});
    } catch (err) {
      global.logger.error(`Error at verify() - An error occurred while verifying jwt token ${err.message}.`);
    }
  }
  return decoded;
};

module.exports = jwt;