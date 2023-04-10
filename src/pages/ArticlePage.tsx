import React from "react";
import { useParams } from "react-router-dom";
import articles from "./ArticleContent";
import NotFoundPage from "./NotFoundPage";

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find((article) => article.name === articleId);
  return (
    <div>
      {article ? (
        <>
          <h1>{article.title}</h1>
          {article.content.map((paragraph, key) => (
            <p key={key}>{paragraph}</p>
          ))}
        </>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );
};

export default ArticlePage;
