const express = require("express");
const router = express.Router();
const { userById, readUser, updateUser } = require("../../controllers/user");
const {
  requireSignin,
  isAuthorized,
  isAdmin,
} = require("../../controllers/auth");

router.get(
  "/secret/:userId",
  requireSignin,
  isAuthorized,
  isAdmin,
  (req, res) => {
    res.json({
      user: req.profile,
    });
  }
);

//read user profile
router.get("/user/:userId", requireSignin, isAuthorized, readUser);
// update user profile
router.put("/user/:userId", requireSignin, isAuthorized, updateUser);

router.param("userId", userById);

module.exports = router;
