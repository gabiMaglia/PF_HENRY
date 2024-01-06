const express = require("express");
const placesrouter = express.Router();

Router.get("google-places-api-key", (req, res) => {
  res.json({ apiKey: process.env.GOOGLE_PLACES_API_KEY });
});

module.exports = placesrouter;
