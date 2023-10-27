const express = require("express");
const router = express.Router();

const {
  InsertAccounts,
  GetAccounts,
  GetAccountsById,
  EditAccounts,
  DeleteAccounts,
} = require("../controller/accounts.controller");

router.post("/", InsertAccounts);
router.get("/", GetAccounts);
router.get("/:id", GetAccountsById);
router.put("/:id", EditAccounts);
router.delete("/:id", DeleteAccounts);

module.exports = router;
