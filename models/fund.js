const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fundSchema = new Schema({
  fundName: String,
  description: String,
  totalGoal: Number,
  goalAchieved: Number,
  fundraiser: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fundDonator: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Fund = mongoose.model("Fund", fundSchema);
module.exports = Fund;
