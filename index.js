const express = require("express");
const app = express();
const pingCheck = require("./routes/PingCheck").router

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("OpenCloud API is Up and Running..");
});

app.use("/devicestatus", pingCheck);

app.listen(PORT, () => {
  console.log(`App is Running on Port ${PORT}`);
});
