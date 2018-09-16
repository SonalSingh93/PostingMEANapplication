const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/post')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.connect("mongodb+srv://sonal:yymI5Mhr9ECXRWrM@cluster0-opklo.mongodb.net/test?retryWrites=true")
.then(() => {
  console.log("connected to db");
})
.catch(() => {
  console.log("connection failed");
});

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-AllowMethods","GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts' ,(req,res,next) =>
{
  //const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log();
  res.status(201).json({
    message: 'Post sent successfully'
  });
});

app.use('/api/posts',(req,res,next) => {
  const posts = [
    {
      id: "sjhfwau",
      title: "first server side post",
      content: "from server"
    },
    {
      id: "shfwofa",
      title: "second server side post",
      content: "from server!"
    }
  ];
  res.status(200).json(
    {
      message: "Posts fetched successfully",
      posts: posts
    }

  );
});

module.exports = app;
