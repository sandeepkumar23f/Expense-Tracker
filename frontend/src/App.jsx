import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
import Expense from "./components/Expense";
import Login from "./components/Login";
import AddExpense from "./components/AddExpense";
import Navbar from "./components/Navbar";
function App() {
  const [login, setLogin]=useState(!!localStorage.getItem("login"))
  return (
      <>
      <Navbar login={login} setLogin={setLogin} />
      <Routes>
        <Route path="/" element={<Expense/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/expenses" element={<Expense/>} />
        <Route path="/add-expense" element={<AddExpense/>} />
      </Routes>
      </>
  );
}

export default App;
