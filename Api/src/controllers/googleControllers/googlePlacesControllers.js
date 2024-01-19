require("dotenv").config();
const axios = require("axios");

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

const getPrecioEnvios = async (destination) => {
  const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${placeId}&destination=${destination}&key=${apiKey}`;

  try {
    const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;
    const placeDetailsResponse = await axios.get(placeDetailsUrl);
    const location = placeDetailsResponse.data.result.geometry.location;

    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${location.lat},${location.lng}&destination=${destination}&key=${apiKey}`;
    const response = await axios.get(apiUrl);

    const data = response.data;
    const distance = data.routes[0].legs[0].distance.text;
    let distanceSinUnidad = distance.replace(" km", "");
    let distanceValue = Number(distanceSinUnidad);
    let shippingPrice = distanceValue * 100;
    return shippingPrice;
  } catch (error) {
    console.error("Error al recuperar reseñas de Google Places:", error);
  }
};

module.exports = { getPrecioEnvios };
