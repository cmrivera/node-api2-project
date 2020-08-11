const express = require("express");
const welcomeRouter = require("./users/welcome-router");
const postRouter = require("./users/post-router");

const server = express();
const port = 4000;

server.use(express.json());
server.use(welcomeRouter);
server.use(postRouter);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
