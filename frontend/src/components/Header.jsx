import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

const Header = ({ search, setSearch, onMenuToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState(search || "");

  const handleSearch = (e) => {
    e.preventDefault();
    if (setSearch) setSearch(input);
  };

  return (
    <header className="header">
      {/* Left Section */}
      <div className="header-left">
        {onMenuToggle && (
          <button className="menu-btn" onClick={onMenuToggle}>
            ☰
          </button>
        )}

        <Link to="/" className="logo">
          <strong>YouTube Clone</strong>
        </Link>
      </div>

      {/* Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          className="search-input"
          placeholder="Search videos..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="search-btn" type="submit">
          🔍
        </button>
      </form>

      {/* Right Section */}
      <div className="header-right">
        {!user ? (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Sign In
          </button>
        ) : (
          <div className="profile-area">
            <span className="username">{user.username}</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
