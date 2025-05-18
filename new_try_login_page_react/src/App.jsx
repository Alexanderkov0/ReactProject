// import { useState } from 'react'
import LoginWeb from "./components/components/forms/LoginWeb";
import RegisterWeb from "./components/components/forms/RegisterWeb";
// import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWeb />} />
        <Route path="/register" element={<RegisterWeb />} />
      </Routes>
    </Router>
  );
}

export default App
