require('dotenv').config();
const DB_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3001;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/user");
const transactionRoute = require("./routes/transactionRoutes");

const User = require('./models/user');
const Fund = require('./models/Fund');

const app = express();
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/", authRoute);
app.use('/donate', transactionRoute);

// Route to list a new fund
app.post('/listFund/:id', async (req, res) => {
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
});


// Route to get all funds
app.get('/getFunds', async (req, res) => {
  try {
    const allFunds = await Fund.find({});
    res.json(allFunds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching funds" });
  }
});

// Route to get fund info by ID
app.get('/getFundInfo/:id', async (req, res) => {
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
});


// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
