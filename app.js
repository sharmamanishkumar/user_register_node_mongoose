const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./api/router/users");
const userDetails = require("./api/router/myusers");
const countryRuter=require("./api/router/countrystate")
const contactRouter= require("./api/router/contact")
const massageRouter = require("./api/router/massege")

const app = express();

mongoose.connect( process.env.MOGNO_CLUSTER_APP ||
      "mongodb+srv://manish:"+
      process.env.MONGO_ATLAS_PW +
      "@cluster0.lvk1u.mongodb.net/myuser?retryWrites=true&w=majority",
      {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
  mongoose.Promise = global.Promise;
  app.use(morgan("dev"));
  app.use("/upload", express.static("upload"));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Header",
      "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE,PATCH,GET");
      return res.status(200).json({});
    }
    next();
  });

  app.use("/user",userRoutes)
  app.use("/userdetails",userDetails)
  app.use("/country",countryRuter)
  app.use("/contact",contactRouter)
  app.use("/massage",massageRouter)

  app.use('/',(req,res)=>{
    res.send('Welcome sir ')
  })
  app.use((req, res, next) => {
    const error = new Error("i am not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  });
  
  module.exports = app;