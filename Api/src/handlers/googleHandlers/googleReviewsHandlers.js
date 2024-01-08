const { getGoogleReviews } = require("../../controllers/googleControllers/googleReviewsController");

const getGoogleReviewsHandler = async (req, res) => {
    try {
        const response = await getGoogleReviews();
        if(response.error) return res.status(400).json(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

module.exports = { getGoogleReviewsHandler };