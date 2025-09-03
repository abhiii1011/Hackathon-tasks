import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState({});

  useEffect(() => {
    socket.on("message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on("userList", (data) => {
      setUsers(data);
    });

    return () => {
      socket.off("message");
      socket.off("userList");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit("message", message);
      setMessage("");
    }
  };

  const updateUsername = () => {
    if (username.trim()) {
      socket.emit("setUsername", username);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>💬 Real-Time Chat App</h2>

      {/* Username input */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button 
          onClick={updateUsername} 
          style={{ padding: "8px 12px", background: "#007bff", color: "white", border: "none" }}>
          Set Username
        </button>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        {/* Chat box */}
        <div style={{ flex: 3, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
          <div style={{ height: "300px", overflowY: "scroll", marginBottom: "10px" }}>
            {chat.map((msg, i) => (
              <div key={i} style={{ margin: "5px 0" }}>
                <strong>{users[msg.id] || "Anonymous"}:</strong> {msg.text}
              </div>
            ))}
          </div>

          <div style={{ display: "flex" }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1, padding: "8px" }}
            />
            <button 
              onClick={sendMessage} 
              style={{ padding: "8px 12px", background: "green", color: "white", border: "none" }}>
              Send
            </button>
          </div>
        </div>

        {/* User list */}
        <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "5px", padding: "10px" }}>
          <h4>🟢 Online Users</h4>
          <ul>
            {Object.values(users).map((user, i) => (
              <li key={i}>{user}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
