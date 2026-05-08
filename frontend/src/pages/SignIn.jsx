import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/SignInandUp.css';

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("https://karoo-production.up.railway.app/api/auth/login" || "http://localhost:8080/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
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
          type="email"
          placeholder="Username"
          value={email}
          onChange={(e) => setemail(e.target.value)}
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