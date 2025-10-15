import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [userData,setUserData]=useState({email: "", password: ""})
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.getItem("login")
    navigate("/")
  },[navigate])

  const handleLogin = async ()=>{
    if(!userData.email || !userData.password){
      console.log("Enter all details")
      alert("please fill all fields")
      return;
    }

    try{
      let res = await fetch("http://localhost:5000/login",{
        method: "POST",
        body: JSON.stringify(userData),
        credentials: "include",
        headers: {"Content-Type": "Application/json"}
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
  return(
    <div className="container">
      <h1>Login</h1>
      <label>Email</label>
      <input
        type="text"
        placeholder="Enter user email"
        value={userData.email}
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />

      <label>Password</label>
      <input
        type="password"
        placeholder="Enter user password"
        value={userData.password}
        onChange={(e) =>
          setUserData({ ...userData, password: e.target.value })
        }
      />

      <button onClick={handleLogin} className="submit">
        Login
      </button>

      <Link to="/signup">Sign Up</Link>
    </div>
  )
}
