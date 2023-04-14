import ArticlesList from "../components/ArticlesList";
import { Typography } from "@mui/material";

const ArticlesListPage = () => {
  return (
    <div>
      <Typography variant="h3">Articles</Typography>
      <ArticlesList />
    </div>
  );
};

export default ArticlesListPage;
