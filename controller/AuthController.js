require('dotenv').config();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res, next) => {
  try {
    const { name, mail, role, state, country, password } = req.body.inputValue;
    const existingUser = await User.findOne({ mail });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ name, mail, role, state, country, password });
    const token = await user.generateToken();
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user, token, userId: user._id.toString() });
    next();
  } catch (error) {
    console.error(error);
  }
};


module.exports.Login = async (req, res, next) => {
    try {
      const { mail, password } = req.body.inputValue;
      if(!mail || !password ){
        return res.json({message:'All fields are required'})
      }
      const user = await User.findOne({ mail });
      if(!user){
        return res.json({message:'Invalid Credential' }) 
      }
      const auth = await bcrypt.compare(password,user.password)
      if (!auth) {
        return res.json({message:'Incorrect password or mail' }) 
      }
      const token = await user.generateToken();
       res.status(200).json({ message: "User logged in successfully", success: true, user, token, userId: user._id.toString() });
       next()
    } catch (error) {
      console.error(error);
    }
  }