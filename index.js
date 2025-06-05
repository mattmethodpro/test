console.log("🟢 Server code loaded");

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('GPT SMS Proxy is running.');
});

app.post('/relay', async (req, res) => {
  console.log('⚡ Webhook hit:', req.body);

  try {
    const incomingMessage = req.body.Body || '';
    const phoneNumber = req.body.From || 'unknown';

    console.log(`📩 Message from ${phoneNumber}: ${incomingMessage}`);

    // Forward to Make.com webhook (replace with your actual one)
    const makeWebhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (makeWebhookUrl) {
      await axios.post(makeWebhookUrl, {
        from: phoneNumber,
        message: incomingMessage,
      });
    }

    res.status(200).send('OK');
  } catch (err) {
    console.error('❌ Relay error:', err.message);
    res.status(500).send('Error');
  }
});

app.listen(port, () => {
  console.log(`🚀 Proxy server running on port ${port}`);
});
