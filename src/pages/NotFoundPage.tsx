import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const NotFoundPage = () => {
  return (
    <div>
      <Typography variant="h3">404 - Page not found</Typography>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default NotFoundPage;
