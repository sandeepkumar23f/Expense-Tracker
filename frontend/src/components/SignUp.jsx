import { useState } from "react";
import {Link, useNavigate } from "react-router-dom"

export default function SignUp(){
    const [userData,setUserData]=useState({name: "", email: "", password: ""});
    const navigate = useNavigate();
    const handleSignUp = async ()=>{
        if(!userData.name || !userData.email || !userData.password){
            alert("please fill all fields");
            return;
        }
        try{
            let result = await fetch("http://localhost:5000/signup", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(userData),
                headers: {"Content-Type":"Application/json"},
            })

            result = await result.json();
            
            if(result.success){
                localStorage.setItem("login",userData.email);
                navigate("/")
            } else{
                alert(result.message || "signup failed")
            }
        } catch(error){
            console.error("Signup error: ", error);
            alert("Server error: please try again")
        }
    }
    return (
  <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
    <h1 className="text-2xl font-semibold">Sign Up</h1>

    <label className="w-64 text-left">Name</label>
    <input
      type="text"
      placeholder="Enter your name"
      value={userData.name}
      onChange={(e) => setUserData({ ...userData, name: e.target.value })}
      className="w-64 border border-gray-300 rounded px-3 py-2"
    />

    <label className="w-64 text-left">Email</label>
    <input
      type="email"
      placeholder="Enter your email"
      value={userData.email}
      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      className="w-64 border border-gray-300 rounded px-3 py-2"
    />

    <label className="w-64 text-left">Password</label>
    <input
      type="password"
      placeholder="Enter your password"
      value={userData.password}
      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      className="w-64 border border-gray-300 rounded px-3 py-2"
    />

    <button
      onClick={handleSignUp}
      className="w-64 bg-green-600 text-white py-2 rounded"
    >
      Sign Up
    </button>

    <Link to="/login" className="text-blue-600 underline">
      Already have an account? Login
    </Link>
  </div>
);
}
