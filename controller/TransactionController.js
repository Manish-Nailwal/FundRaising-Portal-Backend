const User = require("../models/user");
const Transaction = require("../models/transaction");
const Fund = require("../models/Fund");

module.exports.addTransaction = async (req, res) => {
  let donationData = req.body.data;
  let receiverId = req.params.id;
  
  const fund = await Fund.findById(receiverId);
  const reciever = await User.findById(fund.owner);
  const newTransaction = new Transaction({
    amount: donationData.amount,
    sender: donationData.senderId,
    receiver: receiverId,
    fundowner: reciever
  });
  console.log(newTransaction);
  await newTransaction.save();

  fund.goalAchieved =
    parseInt(fund.goalAchieved) + parseInt(donationData.amount);
  fund.fundDonator.push(donationData.senderId);
  await fund.save();
  
  reciever.transaction.push(newTransaction);
  await reciever.save();
  const sender = await User.findById(donationData.senderId);
  sender.transaction.push(newTransaction);
  await sender.save();
  console.log(fund);

  res.json({ success: true });
};

module.exports.transactionBySender = async (req, res) => {
  const id = req.params.id;

  try {
    const transactions = await Transaction.find({
      $or: [
        { sender: id },
        { fundowner: id } 
      ]
    })
      .populate("sender")
      .populate("receiver");

    if (transactions.length === 0) {
      return res
        .status(404)
        .json({ message: "No transactions found for this sender." });
    }

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({ message: "Server error" });
  }
};
