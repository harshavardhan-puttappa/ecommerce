const User = require("../models/UserModal");

module.exports.sayHi = (req, res) => {
  res.json({ message: "Hello there" });
};

module.exports.signup = (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  user.save((error, user) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    res.json({
      user,
    });
  });
};
