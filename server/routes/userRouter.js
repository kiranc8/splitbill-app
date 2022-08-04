const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { registerUser, checkUser } = require("../controller/userController");

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  registerUser(name, email, password)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  checkUser(email, password)
    .then((result) => {
      if (
        result === "User not available ! Please register" ||
        result === "Incorrect username or password"
      ) {
        res.send(result);
      } else {
        let message = "Login successful";
        let resp = {
          userId: result.userId,
          email: result.email,
          password: result.password,
        };
        let token = jwt.sign(resp, process.env.SECRET_KEY, { expiresIn: 8640 });
        res.send({ message: message, auth: true, resp, token: token });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
