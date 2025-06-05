console.log("🟢 Server code loaded");

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Handle both JSON and URL-encoded form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root check
app.get('/', (req, res) => {
  res.send('GPT SMS Proxy is running.');
});

// Minimal Twilio relay route
app.post('/relay', (req, res) => {
  console.log('📩 Twilio webhook received:', req.body);
  res.status(200).send('OK');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Proxy server running on port ${port}`);
});
