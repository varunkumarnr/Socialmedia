const jwt = require("jsonwebtoken");
const config = require("config");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  //check for token
  if (!token) {
    return res.status(401).json({ msg: "No token ,authorization denied" });
  }
  //verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtsecret"));
    req.user = decoded.user;
    next();
    //console.log(decoded.user);
  } catch (err) {
    res.status(401).json({ msg: "token is not valid" });
  }
};
