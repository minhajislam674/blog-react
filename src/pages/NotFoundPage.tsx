import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <h1>404: Page Not Found</h1>
      <Link to="/">Back to home</Link>
    </div>
  );
};

export default NotFoundPage;
