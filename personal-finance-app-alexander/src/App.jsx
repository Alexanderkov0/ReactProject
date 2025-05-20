// import { useState } from 'react'
import LoginWeb from "./components/components/forms/LoginWeb";
import RegisterWeb from "./components/components/forms/RegisterWeb";
// import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "./components/components/Overview/Overview";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginWeb />} />
        <Route path="/register" element={<RegisterWeb />} />
        <Route path="/overview" element={<Overview />} />
        {/* <Route path="/Transactions" element={<Transactions />} /> */}
      </Routes>
    </Router>
  );
}

export default App
