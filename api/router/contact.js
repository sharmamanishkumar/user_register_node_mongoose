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
            message:"Inserted Contact",//print Massage
            data:{
                yourName:result.yourName,
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

router.get("/", (req, res, next) => {
    ContactDetail.find()
      .select()
      .exec()
      .then((result) => {
        // console.log(result,'oiuytre');
        const response = {
          count: result.length,
          message: "all Massage",
          users: result.map((res) => {
            return {
              _id: res._id,
              yourName:res.yourName,
              mobile:res.mobile,
              city:res.city,         
              date:res.date ,
            };
          }),
        };
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });

  router.get("/", (req, res, next) => {
    MassegeDetail.find()
      .select()
      .exec()
      .then((result) => {
        // console.log(result,'oiuytre');
        const response = {
          count: result.length,
          message: "all Massage",
          users: result.map((res) => {
            return {
              _id: res._id,
              massege:res.massege,
              date:res.date,
              name:res.name,         
              mobile:res.mobile ,
              
            };
          }),
        };
        res.status(200).json(response);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: err,
        });
      });
  });




module.exports = router;
