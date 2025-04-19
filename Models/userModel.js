const mongoose = require("mongoose")

mongoose.connect(process.env.URL)
.then(()=> {
    console.log("connectedd")
})
.catch((err)=> {
    console.log("Error  " , err)
})

const userSchema = new mongoose.Schema({
    username : {
        type : String
    },
    teamName : {
        type : String
    },
    abilities : [{
        type : String
    }],
    email : {
        type : String
    },
    password : {
        type : String
    },
    score : {
        type : Number,
        default : 5
    },
    rank : {
        type : Number
    } 
})


module.exports = mongoose.model("User" , userSchema)
