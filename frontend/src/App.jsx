import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      <Route
        path="/admin"
        element={
          token && localStorage.getItem("role") === "ADMIN"
            ? <AdminDashboard />
            : <Navigate to="/dashboard" />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={token ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>

    
  );
}

export default App;