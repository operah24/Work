const { User } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");

//register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        error,
        message: "User already register",
      });
    }
    user = new User({
      email,
      name,
      password,
    });

    //hashing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    //generate token for users
    const token = sign(
      {
        id: user._id,
      },
      "OPEYEMI",
      { expiresIn: "24h" }
    );
    return res.status(200).json({
      status: "success",
      message: "successfully registered",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error,
        message: "user or password does not exist",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({
        error,
        message: "email or password does not exist",
      });
    }
    const token = sign(
      {
        id: user._id,
      },
      "OPEYEMI",
      { expiresIn: "24h" }
    );
    return res.status(201).json({
      status: "success",
      message: "Login successfully",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
    });
  }
};
module.exports = { registerUser, loginUser };
