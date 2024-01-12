// HOOKS
import { useEffect, useState } from "react";
// MATERIAL UI
import { Box, Typography, Avatar, Rating } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
// SERVICES
import { googleReviewsServices } from "../../services/googleReviewsServices";
import { useTheme } from "@emotion/react";

const ReviewsComponent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await googleReviewsServices();
        setReviews(data);
      } catch (error) {
        console.log("Error al recibir reseñas:", error);
      }
    };
    fetchReviews();
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#000",
          width: "100%",
          height: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#fff", textTransform: "uppercase", fontWeight: "900" }}
        >
          Reseñas de nuestros clientes
        </Typography>
      </Box>
      <Box sx={{ padding: "2em", backgroundColor: "#f5f5f5" }}>
        <Typography variant="h4" align="center" gutterBottom></Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            flexDirection: isMobile ? "column" : "row",
          }}
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
                width: isMobile ? "100%" : "300px",
                height: "400px",
                overflow: "auto",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
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
