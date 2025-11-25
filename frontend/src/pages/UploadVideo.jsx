import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate.js";

const UploadVideo = () => {
  const { user, API_BASE } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    category: "Web Development"
  });

  const [loading, setLoading] = useState(false);
  const [channelId, setChannelId] = useState(null);

  // Get user's channel ID (important)
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axiosPrivate.get(`/api/channels/by-user/${user._id}`);
        setChannelId(res.data._id);
      } catch (err) {
        console.log("Channel fetch error:", err);
      }
    };

    if (user) fetchChannel();
  }, [user, axiosPrivate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channelId) return alert("Your channel was not found!");

    setLoading(true);

    try {
      const payload = { ...form, channelId };

      await axiosPrivate.post("/api/videos", payload);

      alert("Video uploaded successfully!");

      navigate(`/channel/${channelId}`);
    } catch (err) {
      alert("Upload failed!");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="upload-page">
      <form className="upload-form" onSubmit={handleSubmit}>
        <h2>Upload New Video</h2>

        <input
          name="title"
          placeholder="Video Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows={4}
        />

        <input
          name="thumbnailUrl"
          placeholder="Thumbnail Image URL"
          value={form.thumbnailUrl}
          onChange={handleChange}
          required
        />

        <input
          name="videoUrl"
          placeholder="Video File URL"
          value={form.videoUrl}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
};

export default UploadVideo;
