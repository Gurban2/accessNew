import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import NavbarDarkExample from "./components/Sidebar/NavbarDarkExample"; // Updated import
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <NavbarDarkExample /> {/* Sidebar on the left */}
        <div className="main">
          <Header /> {/* Header at the top */}
          <div className="content">
            <Routes>
              {/* Your routes will go here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
