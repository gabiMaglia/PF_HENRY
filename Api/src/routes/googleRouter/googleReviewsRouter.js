const { Router } = require("express");

const googleRouter = Router();

const {
  getGoogleReviewsHandler,
} = require("../../handlers/googleHandlers/googleReviewsHandlers");

const {
  getPrecioEnviosHandler,
} = require("../../handlers/googleHandlers/googlePlacesHandler");

googleRouter.get("/google-reviews", getGoogleReviewsHandler);

googleRouter.get("/envios", getPrecioEnviosHandler);

module.exports = googleRouter;
