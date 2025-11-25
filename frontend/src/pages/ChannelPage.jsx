import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate.js";
import axios from "axios";

const ChannelPage = () => {
  const { id } = useParams();
  const { API_BASE, user } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const [channel, setChannel] = useState(null);
  const [videos, setVideos] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "Web Development"
  });
  const [editingId, setEditingId] = useState(null);

  const fetchChannel = async () => {
    const res = await axios.get(`${API_BASE}/api/channels/${id}`);
    setChannel(res.data.channel);
    setVideos(res.data.videos);
  };

  useEffect(() => {
    fetchChannel();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, channelId: id };

    if (editingId) {
      await axiosPrivate.put(`/api/videos/${editingId}`, payload);
    } else {
      await axiosPrivate.post("/api/videos", payload);
    }

    setForm({
      title: "",
      description: "",
      thumbnailUrl: "",
      videoUrl: "",
      category: "Web Development"
    });

    setEditingId(null);
    fetchChannel();
  };

  const handleEdit = (video) => {
    setEditingId(video._id);
    setForm({
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      videoUrl: video.videoUrl,
      category: video.category
    });
  };

  const handleDelete = async (videoId) => {
    if (!window.confirm("Delete this video?")) return;
    await axiosPrivate.delete(`/api/videos/${videoId}`);
    fetchChannel();
  };

  if (!channel) return <div>Loading...</div>;

  const isOwner = user && user._id === channel.owner;

  return (
    <div className="channel-page">
      <Header search={""} setSearch={() => {}} />

      <div className="channel-banner">
        <h2>{channel.channelName}</h2>
        <p>{channel.description}</p>
        <p>{channel.subscribers} subscribers</p>
      </div>

      {isOwner && (
        <section className="video-form-section">
          <h3>{editingId ? "Edit Video" : "Upload New Video"}</h3>

          <form className="video-form" onSubmit={handleSubmit}>
            <input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
            />
            <input
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
            />
            <input
              name="thumbnailUrl"
              placeholder="Thumbnail URL"
              value={form.thumbnailUrl}
              onChange={handleChange}
            />
            <input
              name="videoUrl"
              placeholder="Video URL"
              value={form.videoUrl}
              onChange={handleChange}
            />
            <input
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
            />
            <button type="submit">
              {editingId ? "Update Video" : "Create Video"}
            </button>
          </form>
        </section>
      )}

      <section className="channel-videos">
        <h3>Videos</h3>

        <div className="video-grid">
          {videos.map((v) => (
            <div key={v._id} className="channel-video-card">
              <img src={v.thumbnailUrl} alt={v.title} />
              <h4>{v.title}</h4>
              <p>{v.views} views</p>

              {isOwner && (
                <div className="channel-video-actions">
                  <button onClick={() => handleEdit(v)}>Edit</button>
                  <button onClick={() => handleDelete(v._id)}>Delete</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChannelPage;
