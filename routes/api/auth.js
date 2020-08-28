const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
    console.log(User);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.post(
  "/",
  [
    check("email", "enter valid email").isEmail(),
    // check("username", "enter valid username").exists(),
    check("password", "please enter valid password").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // let usernameCheck = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ msg: "email does not exist " });
      }
      // else if (!usernameCheck) {
      //   return res.status(400).json({ msg: "User name does not exist" });
      // }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ msg: "check your password" });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //res.send("logged In successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);
router.post(
  "/",
  [
    //validation
    // check("username", "enter username with mininmum of 5 charaters").isLength({
    //   min: 5,
    // }),
    check("email", "please enter valide email").isEmail(),
    check("password", "password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, email, password } = req.body; //destruring data
    try {
      //user exits
      let user = await User.findOne({ email }); // checking if there is email already
      let usernamecheck = await User.findOne({ username }); // checking if there is same username already
      if (!user) {
        return res.status(400).json({ errors: [{ msg: "invalid email " }] });
      }
      // else if (!usernamecheck) {
      //   return res
      //     .status(400)
      //     .json({ errors: [{ msg: "username name exits" }] });
      // }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Check your Email and password" });
      }
      //return json web token
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtsecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      //res.send("user registered");
    } catch (err) {
      console.error(err.message);
      req.status(500).send("Server Error");
    }
  }
);
module.exports = router;
