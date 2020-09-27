const express = require("express");
const mongoose = require("mongoose");
const Userdetail = require("../models/myusers");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/",(req,res,next)=>{
    console.log(req,'asdasdakjg');
    const userdetails = new Userdetail({
        _id:new mongoose.Types.ObjectId(),
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        city:req.body.city,
        email:req.body.email,
        mobileno:req.body.mobileno,
        dob:req.body.dob
    })
    userdetails.save().then((result)=>{
        console.log(result,'09876543');
        res.status(200).json({
            message:"user details are create",
            createuserdetails:{
                firstname:result.firstname,
                lastname:result.lastname,
                email:result.email,
                mobileno:result.mobileno,
                dob:result.dob
            }
        })
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router;