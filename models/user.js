const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Your Name is required"],
  },
  mail: {
    type: String,
    required: [true, "Your mail-id is required"],
    unique: true,
  },
  role: {
    type: String,
    required: [true, "Your role is required"],
  },
  state: {
    type: String,
    required: [true, "Your state is required"],
  },
  country: {
    type: String,
    required: [true, "Your country is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  transaction: [{
    type: Schema.Types.ObjectId,
    ref: 'Transaction'
  }],
  createdFund: [{
    type: Schema.Types.ObjectId,
    ref: 'Fund'
  }]
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.mail,
      },
      process.env.TOKEN_KEY,
      {
        expiresIn: "7d",
      }
    );
  } catch (error) {
    console.log(error);
  }
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
