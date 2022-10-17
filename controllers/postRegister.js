const bcrypt = require("bcryptjs");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await User.exists({ email });
    if (userExists) {
      return res.status(409).send("Email already exists");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).send({
      userDetails: {
        email: user.email,
        token: token,
        username: user.username,
      },
    });
  } catch (err) {
    return res.status(500).send("Something went Wrong, please try again");
  }
};

module.exports = postRegister;
