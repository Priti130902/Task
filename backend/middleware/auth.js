const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "No token, auth denied" });
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
