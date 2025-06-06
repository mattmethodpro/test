const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// ✅ Paste your Make webhook here
const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/4ecsceyffq63ccy2htwg1lf36u73lhpx";

app.post("/relay", async (req, res) => {
  const smsData = {
    from: req.body.From,
    to: req.body.To,
    body: req.body.Body,
    messageSid: req.body.MessageSid
  };

  console.log("📥 Incoming SMS:", smsData);

  try {
    await axios.post(MAKE_WEBHOOK_URL, smsData);
    console.log("✅ Forwarded to Make");
    res.status(200).send("<Response></Response>");
  } catch (error) {
    console.error("❌ Error forwarding to Make:", error.message);
    res.status(500).send("Error");
  }
});

app.get("/", (req, res) => {
  res.send("SMS Proxy Server is running.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
