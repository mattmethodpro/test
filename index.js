console.log("🟢 Server code loaded");

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Handle both JSON and URL-encoded payloads
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Root route
app.get('/', (req, res) => {
  res.send('GPT SMS Proxy is running.');
});

// Relay webhook route
app.post('/relay', (req, res) => {
  console.log('📡 Received something!');
  res.status(200).send('Received');
});

   

// Start the server
app.listen(port, () => {
  console.log(`🚀 Proxy server running on port ${port}`);
});
