import { useEffect, useState } from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import VideoGrid from "../components/VideoGrid.jsx";
import { useAxiosPrivate } from "../hooks/useAxiosPrivate.js";

const LikedVideos = () => {
  const axiosPrivate = useAxiosPrivate();
  const [videos, setVideos] = useState([]);

  const fetchLikedVideos = async () => {
    const res = await axiosPrivate.get("/api/users/liked");
    setVideos(res.data);
  };

  useEffect(() => {
    fetchLikedVideos();
  }, []);

  return (
    <div className="liked-page">
      <Header search="" setSearch={() => {}} />

      <div className="liked-layout">
        <Sidebar />

        <main className="liked-main">
          <h2>Liked Videos</h2>
          <VideoGrid videos={videos} />
        </main>
      </div>
    </div>
  );
};

export default LikedVideos;
