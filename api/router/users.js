const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/singup", (req, res, next) => {
    User.find({ email: req.body.email })
      .exec()
      .then((user) => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: "User already exist",
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err,
              });
            } else {
              const user = new User({
                _id: mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                firstname:req.body.firstname,
                lastname:req.body.lastname
              });
              user
                .save()
                .then((result) => {
                  res.status(201).json({
                    message: "User are Created",
                  });
                  console.log(result);
                })
                .catch((err) => {
                  console.log(err);
                  res.status(500).json({
                    error: err,
                  });
                });
            }
          });
        }
      });
  });

  router.get("/", (req, res, next) => {
    User.find()
      .select("email firstname lastname")
      .exec()
      .then((result) => {
        // console.log(result,'oiuytre');
        const response = {
          count: result.length,
          message: "all users",
          users: result.map((res) => {
            console.log(res,'098765456789');
            return {
              _id: res._id,
              password:res.password,
              email: res.email,
              firstname: res.firstname,
              lastname: res.lastname,
              requsted: {
                type: "GET",
                url: "http://localhost:3000/user/" + res._id,
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

  router.delete("/:userId", (req, res, next) => {
    User.remove({ _id: req.params.userId })
      .exec()
      .then((result) => {
        console.log(result);
        res.status(200).json({
          message: "User deleted",
          requested: {
            type: "GET",
            url: "http://localhost:3000/user",
          }
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  });


  router.patch("/:userId", (req, res, next) => {
    const id = req.params.userId;
    // const updateOps = {};
    // for (const ops of req.body) {
    //   updateOps[ops.propName] = ops.value;
    // }
    User.update(
      { _id: id },
      { $set: { email: req.body.email, firstname:req.body.firstname, lastname:req.body.lastname  } }
    )
      .exec()
      .then((results) => {
        console.log(results);
        res.status(200).json(results);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          error: error,
        });
      });
  });


  module.exports = router;