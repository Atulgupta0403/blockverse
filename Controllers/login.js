const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../Models/userModel")
const cookie = require("cookie-parser")

const signup = async (req, res) => {
    try {
        const { username, email, password, teamName } = req.body;

        const earlyUser = await User.findOne({ email })
        if (earlyUser) {
            return res.status(201).json({ message: "username or email already exist" })
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validatePassword(password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        }

        if (!username || !email || !password) {
            return res.status(201).json({ message: "All fields are required" })
        }

        if (!validateEmail(email)) {
            return res.status(201).json({ message: "Invalid email" });
        }

        if (!validatePassword(password)) {
            return res.status(201).json({ message: "Invalid password" });
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const user = await User.create({
                    username,
                    email,
                    password: hash,
                    teamName
                })
                // console.log(user)
                res.status(200).json({ message: "User Register Successfully" })
            });
        });
    } catch (error) {
        console.log(error)
    }
}


const login = async (req,res) => {
    const {email , password} = req.body;

    const team = await User.findOne({ email })

    if(team){

        const result = await bcrypt.compare(password , team.password);
        if(result){
            const token = jwt.sign({ email } , process.env.SECRET)
            res.cookie("token" , token);
            res.status(200).json({message : "loggedIn"})

        }
        else{
            res.status(201).json({message : "Incorrect password"})
        }
    }

    else{
        res.status(404).json({message : "Team Not Found"});
    }


}


module.exports = {login , signup};