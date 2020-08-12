const server = require("./server.js");

const port = 4000;

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
