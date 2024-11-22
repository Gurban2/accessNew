import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import NavbarDarkExample from "./components/NavbarDarkExample/NavbarDarkExample";

// Import all pages
import DepartmentsAdd from "./components/Pages/Departments/Add";
import DepartmentsList from "./components/Pages/Departments/All";
import MeetAdd from "./components/Pages/Meet/Add";
import MeetAll from "./components/Pages/Meet/All";
import MeetReport from "./components/Pages/Meet/Report";
import MeetUpcoming from "./components/Pages/Meet/Upcoming";
import OfficesAdd from "./components/Pages/Offices/Add";
import OfficesAll from "./components/Pages/Offices/All";
import RoomsAdd from "./components/Pages/Rooms/Add";
import RoomsList from "./components/Pages/Rooms/List";
import SiteSet from "./components/Pages/Site/SiteSet";
import Translations from "./components/Pages/Site/Translations";
import AddPer from "./components/Pages/User&Permissions/AddPer";
import AddUser from "./components/Pages/User&Permissions/AddUser";
import AllPer from "./components/Pages/User&Permissions/AllPer";
import ListUsers from "./components/Pages/User&Permissions/ListUsers";
import VisitorAdd from "./components/Pages/Visitors/Add";
import VisitorAll from "./components/Pages/Visitors/All";
import VisitorReport from "./components/Pages/Visitors/Report";
import PersonaAdd from "./components/Pages/Visitors/Persona/Add";
import PersonaAll from "./components/Pages/Visitors/Persona/All";

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
              <Route path="/offices/all" element={<OfficesAll />} />

              {/* Departments Routes */}
              <Route path="/departments/add" element={<DepartmentsAdd />} />
              <Route path="/departments/list" element={<DepartmentsList />} />

              {/* Rooms Routes */}
              <Route path="/rooms/add" element={<RoomsAdd />} />
              <Route path="/rooms/list" element={<RoomsList />} />

              {/* Meet Routes */}
              <Route path="/meets/add" element={<MeetAdd />} />
              <Route path="/meets/all" element={<MeetAll />} />
              <Route path="/meets/report" element={<MeetReport />} />
              <Route path="/meets/upcoming" element={<MeetUpcoming />} />

              {/* Site Routes */}
              <Route path="/site/settings" element={<SiteSet />} />
              <Route path="/site/translations" element={<Translations />} />

              {/* Users & Permissions Routes */}
              <Route path="/users/permissions/add" element={<AddPer />} />
              <Route path="/users/permissions/add-user" element={<AddUser />} />
              <Route path="/users/permissions/all" element={<AllPer />} />
              <Route path="/users/permissions/list" element={<ListUsers />} />

              {/* Visitors Routes */}
              <Route path="/visitors/add" element={<VisitorAdd />} />
              <Route path="/visitors/all" element={<VisitorAll />} />
              <Route path="/visitors/report" element={<VisitorReport />} />
              <Route path="/visitors/persona/add" element={<PersonaAdd />} />
              <Route path="/visitors/persona/all" element={<PersonaAll />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
