const User = require('../models/user');
const Fund = require('../models/fund');


module.exports.CreateFund=async (req, res) => {
    const ownerId = req.params.id;
    try {
      const newListedFund = new Fund({ ...req.body.data });
      newListedFund.owner = ownerId;
      newListedFund.goalAchieved = 0;
      const savedFund = await newListedFund.save();
      console.log(savedFund);
  
      const owner = await User.findById(ownerId);
      owner.createdFund.push(newListedFund);
      await owner.save();
      res.status(201).json(savedFund);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error saving fund" });
    }
  }


  module.exports.FundDetails = async (req, res) => {
    try {
      const allFunds = await Fund.find({});
      res.json(allFunds);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching funds" });
    }
  }


  module.exports.FundInfo = async (req, res) => {
    try {
      const fund = await Fund.findById(req.params.id);
      if (!fund) {
        return res.status(404).json({ message: "Fund not found" });
      }
      res.json(fund);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching fund info" });
    }
  }