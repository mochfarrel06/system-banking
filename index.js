const express = require("express");
const app = express();
const router = require("./routes/route");

require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set("view engine", "ejs");

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
