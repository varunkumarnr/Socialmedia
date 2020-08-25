const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
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
          .json({ errors: [{ msg: "User already exits" }] });
      } else if (usernamecheck) {
        return res
          .status(400)
          .json({ errors: [{ msg: "username name exits" }] });
      }
      //using gravator to get gmail user photos
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
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
      res.send("user registered");
    } catch (err) {
      console.error(err.message);
      req.status(500).send("Server Error");
    }
  }
);
module.exports = router;
