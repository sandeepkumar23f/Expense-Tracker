import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [userData,setUserData]=useState({email: "", password: ""})
  const navigate = useNavigate();

  // useEffect(()=>{
  //   localStorage.getItem("login")
  //   navigate("/")
  // },[navigate])

  const API_URL = import.meta.env.VITE_API_URL;

  const handleLogin = async ()=>{
    if(!userData.email || !userData.password){
      console.log("Enter all details")
      alert("please fill all fields")
      return;
    }
    
    try{
      let res = await fetch(`${API_URL}/login`,{
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: {"Content-Type": "application/json"}
      })
      let data = await res.json();
      if(data.success){
        localStorage.setItem("login",userData.email)
        navigate("/")
      } else{
        alert(data.message || "Wrong credentials")
      }
    } catch(err){
      console.error(err.message)
      alert("Login failed please try again")
    }
  }
  return (
  <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
    <h1 className="text-2xl font-semibold text-black">Login</h1>

    <label className="w-64 text-left text-black">Email</label>
    <input
      type="text"
      placeholder="Enter user email"
      value={userData.email}
      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      className="w-64 border border-black rounded px-3 py-2 text-black"
    />

    <label className="w-64 text-left text-black">Password</label>
    <input
      type="password"
      placeholder="Enter user password"
      value={userData.password}
      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      className="w-64 border border-black rounded px-3 py-2 text-black"
    />

    <button
      onClick={handleLogin}
      className="w-64 bg-blue-600 text-white py-2 rounded"
    >
      Login
    </button>

    <Link to="/signup" className="text-blue-600 underline">
      Sign Up
    </Link>
  </div>
);
}
