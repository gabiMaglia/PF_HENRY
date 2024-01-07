const { Router } = require("express");
const placesrouter = Router();

placesrouter.get("/google-places-api-key", (req, res) => {
  try {
    if (!process.env.GOOGLE_PLACES_API_KEY) {
      throw new Error(
        "Google Places API key not found in environment variables"
      );
    }

    res.json({ apiKey: process.env.GOOGLE_PLACES_API_KEY });
  } catch (error) {
    console.error("Error fetching Google Places API key:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = placesrouter;
