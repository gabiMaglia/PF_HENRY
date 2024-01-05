import { Button, CardMedia, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Review = ({ review }) => {
  if (!review) {
    return <div>Error: review es undefined</div>;
  }
  const { reviewer, date, content, imageUrl } = review;
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const handleButtonClick = () => {
    navigate("/review");
  };

  const handleCommentChange = () => {
    setComment(event.target.value);
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
      <CardMedia component="img" height="140" image={imageUrl} alt={reviewer} />
      <CardContent>
        <Typography variant="h5" component="div">
          {reviewer}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
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
