import { useState, useContext } from "react";
import { Context } from "../contexts/ArticleContext";
import useUser from "../hooks/useUser";
import { makeStyles } from "@mui/material";
import { TextField, Button, Typography, Box } from "@mui/material";

interface ArticleProps {
  articleId: string;
}

const AddCommentForm = ({ articleId }: ArticleProps) => {
  const [comment, setComment] = useState("");
  const { user } = useUser();
  const name = user ? user.email : "Anonymous";

  const { addComment } = useContext(Context);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment(articleId, name, comment);
    setComment("");
  };

  const formStyles = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    marginTop: "1rem",
    marginBottom: "1rem",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        "& > :not(style)": { m: 1, width: "50%" },
      }}
    >
      <Typography variant="h5">Add Comment</Typography>
      <form onSubmit={handleSubmit} style={formStyles}>
        <Typography variant="body1">
          You are commenting as {user && user.email}
        </Typography>

        <TextField
          id="comment"
          label="Comment"
          multiline
          rows={4}
          variant="outlined"
          placeholder="Add your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ marginBottom: "1rem" }}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Comment
        </Button>
      </form>
    </Box>
  );
};

export default AddCommentForm;
