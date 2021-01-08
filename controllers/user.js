const User = require("../models/UserModal");

module.exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.json({
        error: "user not found",
      });
    }
    req.profile = user;
    // once capturing the user info in request object using the id continue the application to run
    next();
  });
};
