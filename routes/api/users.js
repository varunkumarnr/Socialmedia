const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const config = require("config");
const normalize = require("normalize-url");
// @route POST api/users
// @desc register user
//@access public
router.post(
  "/",
  [
    //validation
    check("name", "name is required").not().notEmpty(),
    check("username", "enter username with mininmum of 5 charaters").isLength({
      min: 5,
    }),
    check("email", "please enter valide email").isEmail(),
    check(
      "password",
      "please enter password of minimum 6 characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, username, email, password } = req.body; //destruring data
    try {
      //user exits
      let user = await User.findOne({ email }); // checking if there is email already
      let usernamecheck = await User.findOne({ username }); // checking if there is same username already
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "email already exits" }] });
      } else if (usernamecheck) {
        return res
          .status(400)
          .json({ errors: [{ msg: "username name exits" }] });
      }
      //using gravator to get gmail user photos
      const avatar = normalize(
        gravatar.url(email, {
          s: "200",
          r: "pg",
          d: "mm",
        }),
        { forceHttps: true }
      );
      user = new User({
        name,
        email,
        username,
        avatar,
        password,
      });
      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
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
      res.status(500).send("Server Error");
    }
  }
);
module.exports = router;
