const express = require("express");
const router = express.Router();
const { sayHi, signup } = require("../../controllers/user");

router.get("/hi", sayHi);
router.post("/signup", signup);

module.exports = router;
