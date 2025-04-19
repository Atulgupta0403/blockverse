const express = require("express")
const { signup } = require("../Controllers/login")

const router = express.Router()

router.post("/signup" , signup)

module.exports = router
