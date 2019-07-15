const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //Get Token from Request Header
  const token = req.header("x-auth-token");

  //Check if Token doesn't exist
  if (!token) {
    return res.status(401).json({ msg: "No token, Authorization denied" });
  }

  // Verify Token
  try {
    const decodedToken = jwt.verify(token, config.get("jwtSecret"));

    req.user = decodedToken.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
