interface CommentProps {
  comments: {
    _id: string;
    user: string;
    content: string;
  }[];
}

const CommentsList = ({ comments }: CommentProps) => {
  return (
    <div>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <div className="comment-list-item" key={comment._id}>
          <h3>{comment.user}</h3>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentsList;
