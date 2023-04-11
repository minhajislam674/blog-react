import { useState } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";

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

  upvoteArticle: (articleId: string) => void;
  removeVoteArticle: (articleId: string) => void;
}

const ArticlePage = ({
  articles,
  upvoteArticle,
  removeVoteArticle,
}: ArticleProps) => {
  const { articleId } = useParams();
  const [upvoted, setUpvoted] = useState(false);

  try {
    const article = articleId
      ? articles.find((article) => article._id === articleId)
      : undefined;

    if (!article) {
      return <NotFoundPage />;
    }

    return (
      <div>
        <button
          onClick={() => {
            if (upvoted) {
              removeVoteArticle(article._id);
              setUpvoted(false);
            } else {
              upvoteArticle(article._id);
              setUpvoted(true);
            }
          }}
        >
          {upvoted ? "Remove Vote" : "Upvote"}
        </button>
        <br />

        <h1>{article.title}</h1>
        <p>Written by: {article.author}</p>
        <p>This post has currently {article.vote} upvotes!</p>
        <p>{article.content}</p>
        <h2>Comments</h2>
        <CommentsList comments={article.comments} />
        <AddCommentForm articleName={article._id} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Oops! Something went wrong.</div>;
  }
};

export default ArticlePage;
