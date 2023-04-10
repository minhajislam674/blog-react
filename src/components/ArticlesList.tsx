import React from "react";
import { Link } from "react-router-dom";

interface ArticleProps {
  articles: {
    name: string;
    title: string;
    content: string[];
  }[];
}

const ArticlesList = ({ articles }: ArticleProps) => {
  return (
    <div>
      {articles.map((article) => (
        <div className="article-list-item" key={article.name}>
          <h3>{article.title}</h3>
          <p>
            {article.content[0].substring(0, 350)}...
            <Link to={`/articles/${article.name}`}>Read more</Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ArticlesList;
