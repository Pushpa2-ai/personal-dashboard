import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { register as apiRegister } from "../api/auth";
import { AuthContext } from "../components/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = await apiRegister(username, email, password);
      setUser({ authenticated: true });
      navigate("/dashboard");
    } catch (err) {
      console.error("Register failed", err);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-xl font-semibold mb-4">Register</h2>
        <input className="w-full p-2 border rounded mb-2" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input className="w-full p-2 border rounded mb-2" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input className="w-full p-2 border rounded mb-4" placeholder="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="w-full bg-green-500 text-white p-2 rounded">Register</button>
      </form>
    </div>
  );
}
