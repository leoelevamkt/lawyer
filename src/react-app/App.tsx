import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import BlogPost from "@/react-app/pages/BlogPost";
import AdminDashboard from "@/react-app/pages/admin/Dashboard";
import AdminBlog from "@/react-app/pages/admin/Blog";
import AdminSettings from "@/react-app/pages/admin/Settings";
import AdminLogin from "@/react-app/pages/admin/Login";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Routes>
    </Router>
  );
}