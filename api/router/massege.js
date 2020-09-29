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
                massege:result.massage,
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
               requsted: {
                type: "GET",
                url: "http://localhost:5000/massage/" + res._id,
              },
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
