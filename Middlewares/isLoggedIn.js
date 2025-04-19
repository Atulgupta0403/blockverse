const express = require("express");
const jwt = require("jsonwebtoken")
const User = require("../Models/userModel")

const isLoggedIn = (req,res,next) => {
    const token = req.cookies.token;
    if(token){
        const data = jwt.verify(token , "Secret");
        req.user = data;
    }
    else{
        res.status(401).json("Unauthorized")
    }
    
    next();

}


module.exports = isLoggedIn;

