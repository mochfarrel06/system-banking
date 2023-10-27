const express = require("express");
const router = express.Router();
const {
  InsertUsers,
  Get,
  GetByPK,
  EditUsers,
  DeleteUsers,
} = require("../controller/users.controller");

// const {CheckUsersReq} = require("../middleware/middleware");

// router.use(PrintSuccess);
// router.get("/", TestUser);
// router.post("/", CheckPostReq);

router.get("/", Get);
router.get("/:id", GetByPK);
router.post("/", InsertUsers);
router.put("/:id", EditUsers);
router.delete("/:id", DeleteUsers);

module.exports = router;
