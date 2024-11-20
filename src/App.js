import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard";
import OfficesList from "./components/OfficesList";
import OfficesAdd from "./components/OfficesAdd";
import DepartmentsList from "./components/DepartmentsList";
import DepartmentsAdd from "./components/DepartmentsAdd";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">

        <Sidebar />
        <div className="content">
          <Header />  
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/offices/list" element={<OfficesList />} />
            <Route path="/offices/add" element={<OfficesAdd />} />
            <Route path="/departments/list" element={<DepartmentsList />} />
            <Route path="/departments/add" element={<DepartmentsAdd />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
