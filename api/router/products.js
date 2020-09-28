const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/product");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();


router.post("/",(req,res,next)=>{
    console.log(req,'asdasdakjg');
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productQuantatiti:req.body.productQuantatiti,
        dateofexpire:req.body.dateofexpire
    })
    product.save().then((result)=>{
        console.log(result,'09876543');
        res.status(200).json({
            message:"Product Inserted",
            ShowProductDetail:{//Respond
                productName:result.productName,
                productPrice:result.productPrice,
                productQuantatiti:result.productQuantatiti,
                dateofexpire:result.dateofexpire
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
