const express = require("express");
const mongoose = require("mongoose");
const  Country = require("../models/countrystate");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post("/",(req,res,next)=>{
    
    const countryDetail = new Country({
        _id: new mongoose.Types.ObjectId(),
        countryName:req.body.countryName,
        stateName:req.body.stateName
    })
    countryDetail.save().then((result)=>{
        console.log(result,'09876543');
        res.status(200).json({
            message:"Inserted Deatils",
            ShowDeuutails:{//Respond
                countryName:result.countryName,
                stateName:result.stateName            }
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
    Country.find()
      .select()
      .exec()
      .then((result) => {
        // console.log(result,'oiuytre');
        const response = {
          count: result.length,
          message: "Get All Details",
          users: result.map((res) => {
            return {
              _id: res._id,
              countryName:res.countryName,
              stateName:res.stateName  
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
