const express = require("express");
const router = express.Router();
const {TestUser, TestUserPost} = require("../controller/users.controller");

const {
  PrintSuccess,
  PrintSuccessRoute,
  CheckPostReq,
} = require("../middleware/middleware");

router.use(PrintSuccess);

router.use("/v1", () => {
  router.get("/", TestUser);
});

router.use("/v2", () => {
  router.post("/", CheckPostReq, TestUserPost);
});

module.exports = router;
