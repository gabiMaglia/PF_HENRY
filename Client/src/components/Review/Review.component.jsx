import React from "react";

const Review = ({ review }) => {
  const { reviewer, date, content } = review;
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
      </CardContent>
    </Card>
  );
};

export default Review;
