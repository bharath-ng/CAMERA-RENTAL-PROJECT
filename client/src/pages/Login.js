import { useState, useContext } from "react";
import { loginUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      const res = await loginUser({ phone, location });
      login(res.data);
      alert("✅ Login successful");
      navigate("/home");
    } catch {
      alert("❌ Invalid phone or location");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>

        <input
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Location"
          onChange={(e) => setLocation(e.target.value)}
        />

        <button onClick={submit}>Login</button>

        <p>
          New user? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}
