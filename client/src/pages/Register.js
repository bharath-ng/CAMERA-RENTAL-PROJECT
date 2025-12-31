import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: ""
  });

  const navigate = useNavigate();

  const submit = async () => {
    try {
      await registerUser(form);
      alert("✅ Registered successfully");
      navigate("/login");
    } catch {
      alert("❌ Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <h2>Register</h2>

        <input placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Phone" onChange={e=>setForm({...form,phone:e.target.value})}/>
        <input placeholder="Email" onChange={e=>setForm({...form,email:e.target.value})}/>
        <input placeholder="Location" onChange={e=>setForm({...form,location:e.target.value})}/>

        <button onClick={submit}>Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
