import ArticlesList from "../components/ArticlesList";

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

const ArticlesListPage = ({ articles }: ArticleProps) => {
  return (
    <div>
      <h1>Article List</h1>
      <ArticlesList articles={articles} />
    </div>
  );
};

export default ArticlesListPage;
