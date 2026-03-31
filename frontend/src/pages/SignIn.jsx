import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/SignInandUp.css';

const SignIn = () => {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="signin-title">Sign In</h2>

        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
          className="signin-input"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="signin-input"
        />

        <button className="signin-button" onClick={handleLogin}>
          Sign In
        </button>

        <p className="signup-text">
          Don't have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;