const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (authHeader === null) {
    res.status(401).send("no token provided" );
    //authorization = bearer header
  }
  let token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403).send("Authentication failed");
    } else {
      next();
    }
  });
};

module.exports = { verifyToken };
