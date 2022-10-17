const bcrypt = require("bcryptjs");
const User = require("./../models/User");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
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
    }
    res.status(400).send("Invalid Credentials, Please try again");
  } catch (err) {
    return res.status(500).send("Something went Wrong, please try again");
  }
};

module.exports = postLogin;
