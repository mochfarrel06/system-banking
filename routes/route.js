const express = require("express");
const router = express.Router();
const userRoute = require("./users.route");
const accountsRoute = require("./accounts.route");
const transactionsRoute = require("./transactions.route");
const morgan = require("morgan");

router.use(morgan("dev"));
router.get("/ping", (req, res) => {
  res.json({
    data: null,
    message: "PONG",
    status: 200,
  });
});

router.use("/users", userRoute);
router.use("/accounts", accountsRoute);
router.use("/transactions", transactionsRoute);

module.exports = router;
