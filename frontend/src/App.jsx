import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

// Pages
import HomePage from "./pages/HomePage.jsx";
import VideoPlayerPage from "./pages/VideoPlayerPage.jsx";
import ChannelPage from "./pages/ChannelPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UploadVideo from "./pages/UploadVideo.jsx";
import LikedVideos from "./pages/LikedVideos.jsx";

// Components
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

// Protected route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return null;
  }
  return children;
};

// Layout wrapper (handles Header + Sidebar)
const Layout = ({ children }) => {
  const location = useLocation();

  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      <Header /> {/* Render ONCE globally */}
      <div className="app-with-sidebar">
        {!hideSidebar && <Sidebar />}
        <main className="main-content">{children}</main>
      </div>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/watch/:id" element={<VideoPlayerPage />} />
            <Route path="/channel/:id" element={<ChannelPage />} />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/upload"
              element={
                <ProtectedRoute>
                  <UploadVideo />
                </ProtectedRoute>
              }
            />

            <Route
              path="/liked"
              element={
                <ProtectedRoute>
                  <LikedVideos />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
