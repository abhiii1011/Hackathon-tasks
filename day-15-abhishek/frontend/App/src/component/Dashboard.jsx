import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const Dashboard = () => {
  const { token, logout } = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, [token]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <p>{message}</p>
      <button 
        onClick={logout} 
        className="bg-red-500 text-white px-4 py-2 rounded mt-4">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
