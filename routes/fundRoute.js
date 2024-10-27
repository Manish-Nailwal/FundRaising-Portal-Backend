const { CreateFund, FundDetails, FundInfo } = require("../controller/FundController");
const router = require("express").Router();

// Route to list a new fund
router.post('/listFund/:id', CreateFund);
  
  
  // Route to get all funds
  router.get('/getFunds', FundDetails);
  
  // Route to get fund info by ID
  router.get('/getFundInfo/:id', FundInfo);



  module.exports = router;