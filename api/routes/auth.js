const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const AES = require("crypto-js/aes");
const jwt = require("jsonwebtoken");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // Validate required fields
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      return res.status(400).json("All fields are required");
    }

    // Check if the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("Email is already in use");
    }

    // Encrypt the password
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET_KEY
    ).toString();

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: encryptedPassword,
    });

    // Save the user to the database
    const user = await newUser.save();

    // Return the user data
    const { password: userPassword, ...userInfo } = user._doc;
    res.status(201).json(userInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong Password or username!");
    }

    const storedPassword = user.password;
    const decryptedBytes = CryptoJS.AES.decrypt(
      storedPassword,
      process.env.SECRET_KEY
    );
    const originalPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json("Wrong Password or username!");
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );
    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
