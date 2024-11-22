import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import NavbarDarkExample from "./components/NavbarDarkExample/NavbarDarkExample";
import DepartmentsAdd from "./components/Pages/Departments/Add";
import DepartmentsList from "./components/Pages/Departments/All";
import OfficesAdd from "./components/Pages/Offices/Add";
import OfficesList from "./components/Pages/Offices/List";
import RoomsAdd from "./components/Pages/Rooms/Add";
import RoomsList from "./components/Pages/Rooms/List";
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
              {/* Offices Routes */}
              <Route path="/offices/add" element={<OfficesAdd />} />
              <Route path="/offices/list" element={<OfficesList />} />

              {/* Departments Routes */}
              <Route path="/departments/add" element={<DepartmentsAdd />} />
              <Route path="/departments/list" element={<DepartmentsList />} />

              {/* Rooms Routes */}
              <Route path="/rooms/add" element={<RoomsAdd />} />
              <Route path="/rooms/list" element={<RoomsList />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
