import { useState } from "react";

const CommentForm = ({ onSubmit, initialValue = "" }) => {
  const [text, setText] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    onSubmit(text);
    setText("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="comment-input"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button className="comment-submit" type="submit">
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
