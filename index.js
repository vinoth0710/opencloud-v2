const express = require("express");
const app = express();
const deviceStatus = require("./routes/DeviceStatus")
const generateCertificate = require("./routes/GenerateCertificate")

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("OpenCloud API is Up and Running..");
});

app.use("/devicestatus", deviceStatus);
app.use("/generatecertificate", generateCertificate)

app.listen(PORT, () => {
  console.log(`App is Running on Port ${PORT}`);
});
