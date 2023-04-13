import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../contexts/ArticleContext";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";

const ArticlePage = () => {
  const { articleId } = useParams();
  const { articleData, upvoteArticle, removeVoteArticle, upvoted } =
    useContext(Context);

  try {
    const article = articleId
      ? articleData.find((article) => article._id === articleId)
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
            } else {
              upvoteArticle(article._id);
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
        <AddCommentForm articleId={article._id} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Oops! Something went wrong.</div>;
  }
};

export default ArticlePage;
