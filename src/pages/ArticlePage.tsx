import { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../contexts/ArticleContext";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";
import {
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > :not(style)": { m: 1, width: "100%" },
        }}
      >
        <Card>
          <CardHeader
            title={article.title}
            subheader={`Written by: ${article.author}`}
          />
          <CardContent>
            <Typography
              variant="body1"
              style={{ marginTop: "1rem", marginBottom: "1rem" }}
            >
              {article.content}
            </Typography>

            {user ? (
              <Button
                variant="contained"
                color={upvoted ? "secondary" : "primary"}
                onClick={() => {
                  if (upvoted) {
                    removeVoteArticle(article._id);
                  } else {
                    upvoteArticle(article._id);
                  }
                }}
              >
                {upvoted ? "Remove Vote" : "Upvote"}
              </Button>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="text" color="secondary">
                  Login to upvote this article
                </Button>
              </Link>
            )}
            <Typography>
              This article has currently {article.vote} upvotes!
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            {user ? (
              <AddCommentForm articleId={article._id} />
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button variant="text" color="secondary">
                  Login to comment on this article
                </Button>
              </Link>
            )}
            <CommentsList comments={article.comments} />
          </CardContent>
        </Card>
      </Box>
    );
  } catch (error) {
    console.error(error);
    return <div>Oops! Something went wrong.</div>;
  }
};

export default ArticlePage;
