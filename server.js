//import express, welcomerouter, and postrouter
const express = require("express");
const welcomeRouter = require("./users/welcome-router");
const postRouter = require("./users/post-router");

//create express server on port 4000
const server = express();

//make server use express.json middleware
server.use(express.json());
server.use(welcomeRouter);

//use post-router endpoints
server.use(postRouter);

server.get("/", (req, res) => {
  res.send("Welcome to our blog server");
});

module.exports = server;
