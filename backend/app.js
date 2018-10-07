const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postsRoutes = require("./routes/posts")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect("mongodb+srv://sonal:yymI5Mhr9ECXRWrM@cluster0-opklo.mongodb.net/node-angular?retryWrites=true")
.then(() => {
  console.log("connected to db");
})
.catch(() => {
  console.log("connection failed");
});

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use('/api/posts', postsRoutes);
module.exports = app;
