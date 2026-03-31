import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/SignInandUp.css';

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signup", {
        email,
        password,
      });
      alert(res.data.message || "Signup successful!");
      navigate("/signin");
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2 className="signin-title">Sign Up</h2>

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

        <button className="signin-button" onClick={handleSignup}>
          Sign Up
        </button>

        <p className="signup-text">
          Already have an account?{" "}
          <span className="signup-link" onClick={() => navigate("/signin")}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;