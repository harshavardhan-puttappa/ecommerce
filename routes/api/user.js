const express = require("express");
const router = express.Router();
const { sayHi, signup, signin, signout } = require("../../controllers/user");
const { userSignupValidator } = require("../../validator");

router.get("/hi", sayHi);
router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);

module.exports = router;
