const CommentList = ({ comments, onEdit, onDelete }) => {
  if (!comments || comments.length === 0)
    return <p>No comments yet. Be the first to comment!</p>;

  return (
    <div className="comment-list">
      {comments.map((c) => (
        <div key={c._id} className="comment-item">
          <div className="comment-header">
            <strong>{c.user?.username || "User"}</strong>
            <span className="comment-date">
              {new Date(c.createdAt).toLocaleString()}
            </span>
          </div>

          <p className="comment-text">{c.text}</p>

          <div className="comment-actions">
            {onEdit && (
              <button className="btn-edit" onClick={() => onEdit(c)}>
                Edit
              </button>
            )}
            {onDelete && (
              <button className="btn-delete" onClick={() => onDelete(c._id)}>
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
