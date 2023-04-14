import ArticlesList from "../components/ArticlesList";
import { Typography } from "@mui/material";

const ArticlesListPage = () => {
  return (
    <div>
      <Typography
        variant="h3"
        style={{ color: "#000", marginBottom: "2rem", marginTop: "2rem" }}
      >
        Articles
      </Typography>
      <ArticlesList />
    </div>
  );
};

export default ArticlesListPage;
