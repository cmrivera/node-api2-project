const express = require("express");
const Posts = require("./data/db");

const router = express.Router();

router.get("/posts", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error retrieving posts" });
    });
});

router.get("/posts/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error retrieving the post" });
    });
});

router.post("/", (req, res) => {
  const post = req.body;

  if (!post.title || !post.contents) {
    res.status(400).json({ errormessage: "Missing user name or email " });
  } else {
    try {
      Posts.insert(post).then((post) => {
        res.status(201).json(post);
      });
    } catch {
      res
        .status(500)
        .json({ error: "there was an error inserting post to database" });
    }
  }
});

router.post("/:id/comments", (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  comment.post_id - Number(id);
  if (!comment.text) {
    res.status(400).json({ errMessage: "please input text for comment" });
  } else {
    Posts.findPostComments(req.params.id)
      .then((comments) => {
        if (comments) {
          Posts.insertComment(comment);
          res.status(201).json(comment);
        } else {
          res.status(404).json({ message: "this post does not exist" });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({
            error: "there was an error while inserting comment to database",
          });
      });
  }
});

module.exports = router;
