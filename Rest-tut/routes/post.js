const express = require("express");
const router = express.Router();
const Post = require("../model/Post");

//get all posts
router.get("/", async (req, res) => {
  // res.send("We are on post.........");
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//using promises
// router.post("/", (req, res) => {
// console.log(req.body);
//   const post = new Post({
//     title: req.body.title,
//     description: req.body.description
//   });

//   post
//     .save()
//     .then(data => {
//       res.json(data);
//       console.log("it saved to the database");
//     })
//     .catch(err => {
//       console.log("e no work", err);
//     });
// });

//Post all
// using async/await
router.post("/", async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description
  });

  try {
    const savedPost = await post.save();
    console.log("saved to database");
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//get specific post
router.get("/:postId", async (req, res) => {
  try {
    const specificPost = await Post.findById(req.params.postId);
    res.json(specificPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete post
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

//update post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.update(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
