import React from "react";
import articles from "./ArticleContent";
import { Link } from "react-router-dom";
import ArticlesList from "../components/ArticlesList";

const ArticlesListPage = () => {
  return (
    <div>
      <h1>Article List</h1>
      <ArticlesList articles={articles} />
    </div>
  );
};

export default ArticlesListPage;
