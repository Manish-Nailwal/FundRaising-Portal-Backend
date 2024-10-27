const { addTransaction, allTransaction, transactionBySender,  } = require("../controller/TransactionController");

const router = require("express").Router();

router.get('/transactions/:id', transactionBySender);

router.post('/:id', addTransaction);

module.exports = router;