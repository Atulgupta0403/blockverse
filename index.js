require("dotenv").config()
const express = require("express")
const cookieParser = require("cookie-parser")
const app = express();

const cors = require("cors")

app.use(cors({
    origin : "*"
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/" , (req,res) => {
    res.send("done")
})

const login = require("./Routers/login")
const signup = require("./Routers/signup")
const addAbility = require("./Routers/addAbility")

app.use("/" ,login);
app.use("/" ,signup);
app.use("/" ,addAbility);


module.exports = app;