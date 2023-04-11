import { Link } from "react-router-dom";

interface ArticleProps {
  articles: {
    _id: string;
    title: string;
    author: string;
    content: string;
    vote: number;
    comments: {
      _id: string;
      user: string;
      content: string;
    }[];
  }[];
}

const ArticlesList = ({ articles }: ArticleProps) => {
  return (
    <div>
      {articles.map((article) => (
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
