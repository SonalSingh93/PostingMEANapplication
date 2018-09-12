const express = require('express');

const app = express();


app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Header", "Origin,X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-AllowMethods","GET, POST, PATCH, DELETE, OPTIONS");
  next();
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
