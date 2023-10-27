const express = require("express");
const router = express.Router();

const {
  sendMoney,
  getTransactionById,
  getTransactions,
} = require("../controller/transactions.controller");

router.post("/", sendMoney);
router.get("/", getTransactions);
router.get("/id", getTransactionById);

module.exports = router;
