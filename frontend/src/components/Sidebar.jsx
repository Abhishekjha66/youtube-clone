import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Sidebar = ({ open = true }) => {
  const { user } = useAuth();

  return (
    <aside className={`sidebar ${open ? "open" : "closed"}`}>
      <nav className="sidebar-menu">
        <Link to="/" className="sidebar-item">
          🏠 Home
        </Link>

        <Link to="/trending" className="sidebar-item">
          🔥 Trending
        </Link>

        {user && (
          <Link to={`/channel/${user.channelId || ""}`} className="sidebar-item">
            📺 Your Channel
          </Link>
        )}

        <Link to="/liked" className="sidebar-item">
          👍 Liked Videos
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
