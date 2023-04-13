import { useState, useContext } from "react";
import { Context } from "../contexts/ArticleContext";

interface articleProps {
  articleId: string;
}

const AddCommentForm = ({ articleId }: articleProps) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const { addComment } = useContext(Context);

  return (
    <div>
      <h3>Add Comment</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(articleId, name, comment);
          setName("");
          setComment("");
        }}
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          placeholder="Add your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button>Add Comment</button>
      </form>
    </div>
  );
};

export default AddCommentForm;
