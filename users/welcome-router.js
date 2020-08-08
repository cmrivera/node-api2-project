const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to our Api, it is pulling from the server" });
});

module.exports = router;
