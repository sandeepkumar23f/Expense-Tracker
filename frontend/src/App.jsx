import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp";
function App() {
  return (
      <Routes>
        <Route path="/" element={<List/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
  );
}

export default App;
