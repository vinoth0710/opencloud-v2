const express = require("express");
const app = express();
const deviceStatus = require("./routes/DeviceStatus").router

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("OpenCloud API is Up and Running..");
});

app.use("/devicestatus", deviceStatus);

app.listen(PORT, () => {
  console.log(`App is Running on Port ${PORT}`);
});
