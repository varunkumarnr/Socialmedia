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
module.exports = router;
