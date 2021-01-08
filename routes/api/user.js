const express = require("express");
const router = express.Router();
const { userById } = require("../../controllers/user");
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

router.param("userId", userById);

module.exports = router;
