const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let User = require("../models/users.model");
const keys = require("../config/keys");
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
const upload = require("../middleware/upload");

router.route("/register").post((req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => res.status(400).json("Error: " + err));
        });
      });
    }
  });
});

router.route("/wishlist/:id").post((req, res) => {
  id = req.params.id;
  User.findById(id)
    .then((user) => {
      if (!user.wishList.includes(id)) {
        user.wishList.push(req.body.product_id);
        user
          .save()
          .then(() => res.json("Product added!"))
          .catch((err) => res.status(400).json("Error: " + err));
      }
      else{
        console.log("Already in wishlist")
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/wishlist/delete/:id").post((req,res) => {
  id = req.params.id;
  User.findById(id)
  .then((user) => {
    user.wishList.pull(req.body.product_id)
    user
    .save()
    .then(() => res.json("Product removed from wishlist"))
    .catch((err) => res.status(400).json("Error: " + err));
  })
})

router.route("/login").post((req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          username: user.username,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.route("/user/:id").get((req, res) => {
  id = req.params.id;
  User.findById(id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route("/login").get((req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   User.findOne({ email: email, password: password })
//     .then((user) => {
//       if (user) res.json(user);
//       else res.json("Invalid Email or password");
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/register").post((req, res) => {
//   const username = req.body.username;
//   const email = req.body.email;
//   const password = req.body.password;
//   //to Update seller!!

//   const newUser = new User({
//     username,
//     email,
//     password,
//   });

//   newUser
//     .save()
//     .then(() => res.json("User added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/update/:id").post(upload.single("profileImage"), (req, res) => {
  id = req.params.id;
  User.findById(id)
    .then((user) => {
      user.username = req.body.username;
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.address = req.body.address;
      user.bio = req.body.bio;
      user.profileImage = req.file.filename;
      // user.profileImage = req.body.profileImage;
      // user.image = "default_url" (to update default url)

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
