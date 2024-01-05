import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Review = ({ review }) => {
  if (!review) {
    return <div>Error: review es undefined</div>;
  }
  const { reviewer, date, content } = review;
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/review");
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {reviewer}
        </Typography>
        <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {date}
        </Typography>
        <Typography variant="body2">{content}</Typography>
        <Button onClick={handleButtonClick}>Comentarios de Google</Button>
      </CardContent>
    </Card>
  );
};

export default Review;
