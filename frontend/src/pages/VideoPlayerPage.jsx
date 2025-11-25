import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate.js";
import CommentList from "../components/CommentList.jsx";
import CommentForm from "../components/CommentForm.jsx";
import axios from "axios";

const VideoPlayerPage = () => {
  const { id } = useParams();
  const { API_BASE, user } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);

  const fetchVideo = async () => {
    const res = await axios.get(`${API_BASE}/api/videos/${id}`);
    setVideo(res.data);
  };

  const fetchComments = async () => {
    const res = await axios.get(`${API_BASE}/api/comments/video/${id}`);
    setComments(res.data);
  };

  useEffect(() => {
    fetchVideo();
    fetchComments();
  }, [id]);

  const handleLike = async () => {
    await axiosPrivate.post(`/api/videos/${id}/like`);
    fetchVideo();
  };

  const handleDislike = async () => {
    await axiosPrivate.post(`/api/videos/${id}/dislike`);
    fetchVideo();
  };

  const handleCreateComment = async (text) => {
    await axiosPrivate.post("/api/comments", { videoId: id, text });
    fetchComments();
  };

  const handleEditComment = async (comment) => {
    const newText = window.prompt("Edit comment", comment.text);
    if (!newText) return;
    await axiosPrivate.put(`/api/comments/${comment._id}`, { text: newText });
    fetchComments();
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    await axiosPrivate.delete(`/api/comments/${commentId}`);
    fetchComments();
  };

  if (!video) return <div>Loading...</div>;

  return (
    <div className="watch-page">
      <Header search="" setSearch={() => {}} />

      <main className="watch-container">
        <section className="watch-left">

          {/* Video Player */}
          <video src={video.videoUrl} controls autoPlay className="watch-video" />

          {/* Title */}
          <h2 className="watch-title">{video.title}</h2>

          {/* Views + Likes */}
          <div className="watch-actions">
            <span>{video.views} views</span>

            <div className="like-area">
              <button onClick={handleLike}>
                👍 {video.likes.length}
              </button>

              <button onClick={handleDislike}>
                👎 {video.dislikes.length}
              </button>
            </div>
          </div>

          {/* Channel Info */}
          <div className="watch-channel">
            <Link to={`/channel/${video.channel?._id}`}>
              <strong>{video.channel?.channelName}</strong>
            </Link>
            <p className="watch-description">{video.description}</p>
          </div>

          {/* Comments */}
          <div className="watch-comments">
            <h3>Comments</h3>

            {user && (
              <CommentForm onSubmit={handleCreateComment} initialValue="" />
            )}

            <CommentList
              comments={comments}
              onEdit={handleEditComment}
              onDelete={handleDeleteComment}
            />
          </div>
        </section>

        {/* Right sidebar placeholder */}
        <aside className="watch-right">
          <p>Recommended videos coming soon...</p>
        </aside>
      </main>
    </div>
  );
};

export default VideoPlayerPage;
