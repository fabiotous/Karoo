import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // POST to your backend signup route
      const res = await axios.post("http://localhost:8080/api/auth/signup", {
        email,
        password,
      });

      alert(res.data.message || "Signup successful!");
      // Redirect to login page after signup
      navigate("/signin");
    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Sign Up</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleSignup}>Sign Up</button>
      <br /><br />

      {/* Sign In Button */}
      <button onClick={() => navigate("/signin")}>Sign In</button>
    </div>
  );
};

export default Signup;