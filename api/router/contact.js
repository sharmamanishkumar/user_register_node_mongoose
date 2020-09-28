const express = require("express");
const mongoose = require("mongoose");
const ContactDetail = require("../models/contact");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post("/",(req,res,next)=>{
    const contact = new ContactDetail({
        _id: new mongoose.Types.ObjectId(),
        yourName:req.body.yourName,
        mobile:req.body.mobile,
        city:req.body.city,
        date:req.body.date
    })
    contact.save().then((result)=>{
        res.status(200).json({
            message:"Inserted Contact",
            ContactDetail:{//Respond
                countryName:result.countryName,
                mobile:result.mobile,
                city:result.city,         
                date:result.date       
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
