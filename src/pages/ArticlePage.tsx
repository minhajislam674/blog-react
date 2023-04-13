import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../contexts/ArticleContext";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";

const ArticlePage = () => {
  const { articleId } = useParams();
  const { articleData, upvoteArticle, removeVoteArticle, upvoted } =
    useContext(Context);

  const { user, isLoading } = useUser();

  try {
    const article = articleId
      ? articleData.find((article) => article._id === articleId)
      : undefined;

    if (!article) {
      return <NotFoundPage />;
    }

    return (
      <div>
        <h1>{article.title}</h1>
        <p>Written by: {article.author}</p>
        <p>This post has currently {article.vote} upvotes!</p>
        {user ? (
          <button
            onClick={() => {
              if (upvoted) {
                removeVoteArticle(article._id);
              } else {
                upvoteArticle(article._id);
              }
            }}
          >
            {upvoted ? "Remove Vote" : "Upvote"}
          </button>
        ) : (
          <Link to="/login">
            <button>Login to upvote</button>
          </Link>
        )}
        <p>{article.content}</p>
        {user ? (
          <AddCommentForm articleId={article._id} />
        ) : (
          <Link to="/login">
            <button>Login to comment</button>
          </Link>
        )}
        <CommentsList comments={article.comments} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Oops! Something went wrong.</div>;
  }
};

export default ArticlePage;
