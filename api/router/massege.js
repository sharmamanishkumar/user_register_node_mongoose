const express = require("express");
const mongoose = require("mongoose");
const MassegeDetail = require("../models/massage")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post("/",(req,res,next)=>{
    const contact = new MassegeDetail({
        _id: new mongoose.Types.ObjectId(),
        massage:req.body.massage,
        mobile:req.body.mobile,
        name:req.body.name,
        date:req.body.date
    })
    contact.save().then((result)=>{
        res.status(200).json({
            message:"Inserted Contact",
            MassegeDetail:{//Respond
                massege:result.massege,
                date:result.date,
                name:result.name,         
                mobile:result.mobile       
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
