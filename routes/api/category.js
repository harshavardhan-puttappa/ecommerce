const express = require("express");
const router = express.Router();
const { create } = require("../../controllers/category");
const {
  requireSignin,
  isAuthorized,
  isAdmin,
} = require("../../controllers/auth");

const { userById } = require("../../controllers/user");

router.post(
  "/category/create/:userId",
  requireSignin,
  isAdmin,
  isAuthorized,
  create
);

router.param("userId", userById);

module.exports = router;
