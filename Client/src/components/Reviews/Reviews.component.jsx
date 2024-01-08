import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
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
      <Box>
        <Typography variant="h4" align="center">
          Reseñas de nuestros clientes
        </Typography>
        <Box>
          {reviews.map((review, index) => (
            <Box key={index} variant="body1">
              <Typography>Autor {review.author_name}</Typography>
              <Typography>Comentario {review.text}</Typography>
              <Typography>
                Valoracion {Array(review.rating).fill("⭐").join("")}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default ReviewsComponent;
