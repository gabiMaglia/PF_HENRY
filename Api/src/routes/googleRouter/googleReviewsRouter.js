const { Router } = require("express");

const googleRouter = Router();

const {
  getGoogleReviewsHandler,
} = require("../../handlers/googleHandlers/googleReviewsHandlers");

googleRouter.get("/google-reviews", getGoogleReviewsHandler);

module.exports = googleRouter;
