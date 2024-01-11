import { useEffect, useState } from "react";
import { Box, Typography, Avatar, Rating } from "@mui/material";
import { googleReviewsServices } from "../../services/googleReviewsServices";

const ReviewsComponent = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await googleReviewsServices();
        console.log("Informacion que llega al componente", data);
        setReviews(data);
      } catch (error) {
        console.log("Error al recibir reseñas:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <Box sx={{ padding: "2em", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Reseñas de nuestros clientes
        </Typography>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {reviews.map((review, index) => (
            <Box
              key={index}
              sx={{
                margin: "1em",
                backgroundColor: "whiter",
                padding: "1em",
                borderRadius: "8px",
                boxShadow: "0 4px 6px 0 hsla(0, 0%, 0%, 0.2)",
                width: "300px",
                height: "400px",
                overflow: "auto",
              }}
            >
              <Avatar
                sx={{ width: "60px", height: "60px", marginBottom: "0.5em" }}
                src={review.profile_photo_url}
              />
              <Typography variant="subtitle1" gutterBottom>
                <strong>{review.author_name}</strong>
              </Typography>
              <Rating name="read-only" value={review.rating} readOnly />
              <Typography variant="body2">{review.text}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ReviewsComponent;
