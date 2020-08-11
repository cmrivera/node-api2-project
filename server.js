//import express, welcomerouter, and postrouter
const express = require("express");
const welcomeRouter = require("./users/welcome-router");
const postRouter = require("./users/post-router");

//create express server on port 4000
const server = express();
const port = 4000;

//make server use express.json middleware
server.use(express.json());
server.use(welcomeRouter);

//use post-router endpoints
server.use("/api/posts", postRouter);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
