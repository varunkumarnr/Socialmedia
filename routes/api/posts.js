const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const Post = require("../../models/Post");
router.post(
  "/",
  [auth, [check("text", "text is required in a post").not().notEmpty()]],
  async (req, res) => {
    // @route Post api/posts
    // @desc create a post
    //@access private;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        user: req.user.id,
      });
      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("server error");
    }
  }
);
// @route Get api/posts
// @desc get all post
//@access private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});
// @route delete api/posts/:id
// @desc get post by id
//@access private
router.get("/:id", auth, async (req, res) => {
  try {
    const posts = await Post.findById(req.params.id);
    if (!posts) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("server error");
  }
});
// @route delete api/posts/:username
// @desc get post by username
//@access private
router.get("/:username", auth, async (req, res) => {
  try {
    const posts = await Post.findOne(req.params.username);
    if (!posts) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(500).send("server error");
  }
});
// @route delete api/posts/:id
// @desc get all post
//@access private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(500).json({ msg: "post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(500).json({ msg: "user not authorized" });
    }
    await post.remove();
    res.json({ msg: "post deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: " post not found" });
    }
    return res.status(500).send("cannot delete");
  }
});
// @route PUT api/posts/like/:id
// @desc  ability to post likes
// @access private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if the post as already beed liked by user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.json(400).json({ msg: "Post  already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    return res.status(404).json({ msg: "Server error" });
  }
});
// @route PUT api/posts/dislike/:id
// @desc  ability to unlike posts
// @access private
router.put("/dislike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //check if the post is liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.json(400).json({ msg: "post not liked yet" });
    }
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    return res.json(400).json({ msg: "server error" });
  }
});
// @route POST api/posts/comment/:id
// @desc  ability to post comment
// @access private
router.post(
  "/comment/:id",
  [auth, [check("text", "text is required").not().notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("server error");
    }
  }
);
// @route Delete api/posts/comment/:id/:comment_id
// @desc  ability to delete comment
// @access private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("server error");
  }
});
module.exports = router;
