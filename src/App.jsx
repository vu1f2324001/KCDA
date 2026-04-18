import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./assets/components/common/Navbar";
import Home from "./assets/components/pages/Home";
import Aboutus from "./assets/components/pages/Aboutus";
import Events from "./assets/components/pages/Events";
import Zones from "./assets/components/pages/Zone";
import Feedback from "./assets/components/pages/Feedback";
import News from "./assets/components/pages/News";
import Meeting from "./assets/components/pages/Meeting";
import Membership from "./assets/components/pages/Membership";

// ADMIN IMPORTS
import AdminLogin from "./assets/components/Admin/Login/Login";
import Dashboard from "./assets/components/Admin/Dashboard/Dashboard";

function AppContent() {
  const location = useLocation();

  // HIDE Navbar ONLY when inside the actual dashboard (/admin/...)
  // We keep it VISIBLE on /admin-login so users can navigate back to Home
  const isInsideDashboard = location.pathname.startsWith("/admin/");

  return (
    <>
      {!isInsideDashboard && <Navbar />}

      <Routes>
        {/* Public Website Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/events" element={<Events />} />
        <Route path="/zones" element={<Zones />} />
        <Route path="/news" element={<News />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/meetings" element={<Meeting />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Admin Section */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin/*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
