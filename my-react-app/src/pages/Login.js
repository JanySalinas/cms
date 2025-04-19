import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUserRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Simulate API call to authenticate user and fetch role
    const response = await fakeLoginAPI(username, password);
    if (response.success) {
      setUserRole(response.role); // Set the user's role
      navigate("/dashboard"); // Redirect to dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  const fakeLoginAPI = (username, password) => {
    // Replace this with your actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === "admin" && password === "admin") {
          resolve({ success: true, role: "admin" });
        } else if (username === "user" && password === "user") {
          resolve({ success: true, role: "user" });
        } else {
          resolve({ success: false });
        }
      }, 1000);
    });
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;