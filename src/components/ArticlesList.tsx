import { Link } from "react-router-dom";
import { Context } from "../contexts/ArticleContext";
import { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";

const ArticlesList = () => {
  const { articleData } = useContext(Context);
  return (
    <Box>
      {articleData.map((article) => (
        <Box
          key={article._id}
          borderBottom={1}
          style={{ marginBottom: "1rem" }}
        >
          <Link
            to={`/articles/${article._id}`}
            style={{ textDecoration: "none" }}
          >
            <Typography
              variant="h5"
              style={{ color: "#000", marginBottom: "0.5rem" }}
            >
              {article.title}
            </Typography>
          </Link>
          <Typography variant="subtitle1" style={{ marginBottom: "0.5rem" }}>
            Written by: {article.author}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "1rem" }}>
            {article.content.slice(0, 200) + "..."}
          </Typography>
          <Button
            component={Link}
            to={`/articles/${article._id}`}
            variant="outlined"
            color="primary"
            style={{ marginBottom: "1rem" }}
          >
            Read More
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default ArticlesList;
