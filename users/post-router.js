const express = require("express");
const Posts = require("../data/db");

const router = express.Router();

//get request to find posts then display or respond with error
router.get("/posts/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "error retrieving posts" });
    });
});

//get request to pull up a specific post with id , if achieved respond with post, if not res with error message
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

//post request to post a comment. require body from user,
// if no body res with need body
//if other error res with 500 for error posting data
router.post("/posts", (req, res) => {
  Posts.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

//create request for post to reply to post with a comment.
//make id req, and body req, if not given res with error for body req
//if issue finding post id res with post does not exist, if post found but another err res with 500 for other err inserting post

router.post("/posts/:id/comments", (req, res) => {
  const commentInfo = { ...req.body, post_id: req.params.id };
  console.log(commentInfo);
  Posts.insertComment(commentInfo)
    .then((comment) => {
      res.status(201).json(comment);
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error while saving the comment to the database",
        err,
      });
    });
});

//delete request, find post then req id to remove post
//res with 200 if post cant be removed, respond with 404 if post can not be found

router.delete("/posts/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      Posts.remove(req.params.id)
        .then(() => {
          //deletedPost = posts.filter(post => post.id === Number(req.params.id));
          res.status(200).json(post);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ error: "The post could not be removed" });
        });
    })
    .catch((err) => {
      console.log(err);

      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

//put request to find post and then update post
//res 400 if user does not enter title or contents to update
//if works respond with 200 and update request
//if does not work res with 500 for could not be modified
router.put("/posts/:id", (req, res) => {
  const update = req.body;
  const id = req.params.id;

  Posts.findById(id)
    .then(() => {
      if (!update.title || !update.contents) {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      } else {
        Posts.update(id, update)
          .then(() => {
            res.status(200).json(update);
          })
          .catch((err) => {
            console.log(err);
            res
              .status(500)
              .json({ error: "The post information could not be modified." });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

// exports router

module.exports = router;
