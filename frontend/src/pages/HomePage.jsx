import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar.jsx";
import VideoGrid from "../components/VideoGrid.jsx";
import axios from "axios";
import { API_BASE } from "../config.js";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const params = {};
        if (search) params.search = search;
        if (category) params.category = category;

        const res = await axios.get(`${API_BASE}/api/videos`, { params });
        setVideos(res.data);
      } catch (err) {
        console.error("Video fetch error:", err);
      }
    };
    fetchVideos();
  }, [search, category]);

  return (
    <div className="homepage">
      <FilterBar selected={category} setSelected={setCategory} />
      <VideoGrid videos={videos} />
    </div>
  );
};

export default HomePage;
