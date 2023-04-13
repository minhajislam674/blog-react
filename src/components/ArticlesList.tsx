import { Link } from "react-router-dom";
import { Context } from "../contexts/ArticleContext";
import { useContext } from "react";

const ArticlesList = () => {
  const { articleData } = useContext(Context);
  return (
    <div>
      {articleData.map((article) => (
        <div className="article-list-item" key={article.title}>
          <h3>{article.title}</h3>
          <p>
            {article.content}
            <Link to={`/articles/${article._id}`}>Read more</Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default ArticlesList;
