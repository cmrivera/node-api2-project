const express = require("express");

const router = express.Router();

router.get("/users", (req, res) => {
  users
    .find(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error retrieving users" });
    });
});

module.exports = router;
