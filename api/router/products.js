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
            data:{
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


router.get("/", (req, res, next) => {
    Product.find()
      .select()
      .exec()
      .then((result) => {
        // console.log(result,'oiuytre');
        const response = {
          count: result.length,
          message: "Get All Product",
          Product: result.map((res) => {
            return {
              _id: res._id,
              productName:res.productName,
              productPrice:res.productPrice,
                productQuantatiti:res.productQuantatiti,
                dateofexpire:res.dateofexpire,
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

  router.delete("/:productId", (req, res, next) => {
    Product.remove({ _id: req.params.productId })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "Product deleted",
          requested: {
            type: "GET",
            url: "http://localhost:5000/product",
          }
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  });



module.exports = router;
