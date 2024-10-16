require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false })
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
     return res.json({ status: false })
    } else {
      const user = await User.findById(data.userId)
      if (user) return res.json({status: true,user })
      else return res.json({ status: false })
    }
  })
}