import { useNavigate } from "react-router-dom";

const VideoCard = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/watch/${video._id}`);
  };

  return (
    <div className="video-card" onClick={handleClick}>
      <img src={video.thumbnailUrl} alt={video.title} className="thumbnail" />

      <div className="video-info">
        <h4 className="video-title">{video.title}</h4>
        <p className="video-channel">
          {video.channel?.channelName || "Channel"}
        </p>
        <p className="video-views">{video.views} views</p>
      </div>
    </div>
  );
};

export default VideoCard;
