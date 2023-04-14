import { Box, Typography } from "@mui/material";

interface CommentProps {
  comments: {
    _id: string;
    user: string;
    content: string;
  }[];
}

const CommentsList = ({ comments }: CommentProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "left",
        "& > :not(style)": { m: 1, width: "50%" },
      }}
    >
      <Typography variant="h5">{comments.length} Comment(s)</Typography>
      {comments.map((comment) => (
        <Box key={comment._id} boxShadow={1} p={2} my={2}>
          <Typography variant="caption">{comment.user}</Typography>
          <Typography variant="subtitle1">{comment.content}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default CommentsList;
