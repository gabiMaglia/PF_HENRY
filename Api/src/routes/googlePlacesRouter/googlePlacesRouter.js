const { Router } = require("express");
const placesrouter = Router();

placesrouter.get("google-places-api-key", (req, res) => {
  res.json({ apiKey: process.env.GOOGLE_PLACES_API_KEY });
});

module.exports = placesrouter;
