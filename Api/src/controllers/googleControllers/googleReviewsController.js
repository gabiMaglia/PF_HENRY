require("dotenv").config();
const axios = require("axios");

const apiKey = process.env.GOOGLE_PLACES_API_KEY;
const placeId = process.env.GOOGLE_PLACE_ID;

const getGoogleReviews = async () => {
  try {
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}&language=es`
    );

    console.log('Google Places API Response:', response.data);

    const reviews = response.data.result.reviews;
    if (!reviews || reviews.length === 0){
        return { message: "No se encontraron reseñas del lugar" }
    }
    console.log(reviews);
    return reviews;
  } catch (error) {
    console.error("Error al recuperar reseñas de Google Places:", error);
    throw { error: error.message };
  }
};

module.exports = { getGoogleReviews };
