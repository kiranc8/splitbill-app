const User = require("../models/userModel");

const generateId = () => {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substr(2);
  return head + tail;
};
const registerUser = (name, email, password) => {
  return User.findOne({ email })
    .then((userData) => {
      if (userData === null) {
        let newUser = {
          userId: generateId(),
          name: name,
          email: email,
          password: password,
        };
        User.insertMany([newUser])
          .then()
          .catch((error) => {
            return "Some error occured";
          });
        return "Registered Successfully";
      } else {
        return "User already exist";
      }
    })
    .catch((error) => {
      return error;
    });
};

const checkUser = (email, password) => {
  return User.findOne({ email })
    .then((userData) => {
      if (userData === null) {
        return "User not available ! Please register";
      } else if (userData.email === email && userData.password === password) {
        return userData;
      } else {
        return "Incorrect username or password";
      }
    })
    .catch((error) => {
      return error;
    });
};

module.exports = { registerUser, checkUser };
