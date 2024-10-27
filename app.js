require('dotenv').config();
const DB_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3001;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/userRoute");
const transactionRoute = require("./routes/transactionRoute");
const fundRoute = require("./routes/fundRoute")



const app = express();
app.use(cors({
  origin: [process.env.DOMAIN||"http://localhost:5173"],
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
app.use("/", fundRoute);



// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
