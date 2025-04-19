const express = require("express");
const isLoggedIn = require("../Middlewares/isLoggedIn");
const { addAbility, getAbility } = require("../Controllers/addAbility");
const router = express.Router();

router.post("/ability" , isLoggedIn , addAbility);

router.get("/ability" , isLoggedIn , getAbility);

module.exports = router;