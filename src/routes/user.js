const express = require("express");
const { registerUser, loginUser } = require("../controllers/user");
const { validateRegister, validateLogin } = require("../middlewares/validator");

const router = new express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
