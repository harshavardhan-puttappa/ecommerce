const User = require("../models/UserModal");

// middleware to store user data in req
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

// send the user profile
module.exports.readUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

// udpate the user profile
module.exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to perform this action",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      return res.json(user);
    }
  );
};
