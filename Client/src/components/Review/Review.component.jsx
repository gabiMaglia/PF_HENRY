// HOOKS
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// MATERIAL -UI
import { Button, CardMedia, TextField } from "@mui/material";

const Review = ({ review }) => {
  const [googlePlacesApiKey, setGooglePlacesApiKey] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    console.log("Google Places API Key:", googlePlacesApiKey);
    navigate("/review");
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  useEffect(() => {
    fetch("/places/google-places-api-key")
      .then((response) => response.json())
      .then((data) => {
        setGooglePlacesApiKey(data.apiKey);
      })
      .catch((error) => {
        console.error("Error fetching Google Places API key:", error);
      });
  }, []);

  if (!review) {
    return <div>Error: review es undefined</div>;
  }

  const { reviewer, date, content, imageUrl } = review;

  return (
    <Card style={{ minWidth: 275, marginBottom: 2 }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={reviewer} />
      <CardContent>
        <Typography variant="h5" component="div">
          {reviewer}
        </Typography>
        <Typography
          style={{ fontSize: 12 }}
          color="text.secondary"
          gutterBottom
        >
          {date}
        </Typography>
        <Typography variant="body2">{content}</Typography>
        <Button onClick={handleButtonClick}>Comentarios de Google</Button>
        <TextField
          label="Deja un comentario"
          variant="outline"
          value={comment}
          onChange={handleCommentChange}
          fullWidth
          margin="normal"
        />
      </CardContent>
    </Card>
  );
};

export default Review;
