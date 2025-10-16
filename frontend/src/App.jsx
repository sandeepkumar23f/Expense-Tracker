import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Expense from "./components/Expense";
import Login from "./components/Login";
import AddExpense from "./components/AddExpense";
import Navbar from "./components/Navbar";
import UpdateExpense from "./components/UpdateExpense";
import Protected from "./components/Protected";
function App() {
  const [login, setLogin]=useState(!!localStorage.getItem("login"))
  return (
      <>
      <Navbar login={login} setLogin={setLogin} />
      <Routes>
        <Route path="/" element={<Protected login={login}><Expense/></Protected>} />
        <Route path="/signup" element={<SignUp setLogin={setLogin}/>} />
        <Route path="/login" element={<Login setLogin={setLogin}/>} />
        <Route path="/add-expense" element={<Protected login={login}><AddExpense/></Protected>} />
        <Route path="/update/:id" element={<Protected login={login}><UpdateExpense/></Protected>} />
      </Routes>
      </>
  );
}

export default App;
