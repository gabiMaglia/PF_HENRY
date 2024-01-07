import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CardMedia, TextField } from "@mui/material";
import axios from "axios"; // Asegúrate de importar Axios

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
    axios
      .get("/places/google-places-api-key")
      .then((response) => {
        console.log(response);
        setGooglePlacesApiKey(response.data.apiKey);
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
