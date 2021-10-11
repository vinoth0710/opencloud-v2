const express = require("express");
const app = express();
const ping = require("./PingCheck");

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.json(ping);
});

app.listen(PORT, () => {
  console.log(`App is Running on Port ${PORT}`);
});
