import VideoCard from "./VideoCard.jsx";

const VideoGrid = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return <p>No videos found.</p>;
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
