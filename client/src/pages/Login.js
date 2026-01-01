import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    identifier: ""
  });

  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const register = async () => {
    try {
      const res = await API.post("/api/auth/register", form);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");
    } catch {
      alert("Registration failed");
    }
  };

  const login = async () => {
    try {
      const res = await API.post("/api/auth/login", {
        identifier: form.identifier
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/home");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h2>{isRegister ? "Register" : "Login"}</h2>

      {isRegister && (
        <>
          <input name="name" placeholder="Name" onChange={handleChange} />
          <input name="phone" placeholder="Phone" onChange={handleChange} />
          <input name="email" placeholder="Email" onChange={handleChange} />
          <input name="location" placeholder="Location" onChange={handleChange} />
        </>
      )}

      {!isRegister && (
        <input
          name="identifier"
          placeholder="Email or Phone"
          onChange={handleChange}
        />
      )}

      <button onClick={isRegister ? register : login}>
        {isRegister ? "Register" : "Login"}
      </button>

      <p onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "New user? Register"}
      </p>
    </div>
  );
}

export default Login;
