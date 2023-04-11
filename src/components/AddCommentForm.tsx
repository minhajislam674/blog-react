import { useState } from "react";
import axios from "axios";

interface articleProps {
  articleName: string;
}

const AddCommentForm = ({ articleName }: articleProps) => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  console.log(comment);
  console.log(name);

  const addComment = async () => {
    const response = await axios.post(
      `http://localhost:3000/articles/${articleName}/comments`,
      {
        user: name,
        content: comment,
      }
    );
    const updatedArticle = response.data;
    console.log(updatedArticle);
  };

  return (
    <div>
      <h3>Add Comment</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment();
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
