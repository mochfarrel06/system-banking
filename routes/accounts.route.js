const express = require("express");
const router = express.Router();

const {
  InsertAccounts,
  GetAccounts,
  GetAccountsById,
} = require("../controller/accounts.controller");

router.post("/", InsertAccounts);
router.get("/", GetAccounts);
router.get("/:id", GetAccountsById);

module.exports = router;
