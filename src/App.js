import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import NavbarDarkExample from "./components/NavbarDarkExample/NavbarDarkExample";
import DepartmentsAdd from "./components/Pages/Departments/Add";
import DepartmentsList from "./components/Pages/Departments/All";
import OfficesAdd from "./components/Pages/Offices/Add";
import OfficesAll from "./components/Pages/Offices/All";
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
import { AppPaths } from "./constants/appPaths";

import "./App.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <NavbarDarkExample /> {/* Сайдбар */}
        <div className="main">
          <Header /> {/* Хедер */}
          <div className="content">
            <Routes>
              {/* Offices */}
              <Route path={AppPaths.offices.add} element={<OfficesAdd />} />
              <Route path={AppPaths.offices.all} element={<OfficesAll />} />

              {/* Departments */}
              <Route
                path={AppPaths.departments.add}
                element={<DepartmentsAdd />}
              />
              <Route
                path={AppPaths.departments.all}
                element={<DepartmentsList />}
              />

              {/* Site */}
              <Route path={AppPaths.site.settings} element={<SiteSet />} />
              <Route
                path={AppPaths.site.translations}
                element={<Translations />}
              />

              {/* Users & Permissions */}
              <Route
                path={AppPaths.users.permissions.add}
                element={<AddPer />}
              />
              <Route
                path={AppPaths.users.permissions.addUser}
                element={<AddUser />}
              />
              <Route
                path={AppPaths.users.permissions.all}
                element={<AllPer />}
              />
              <Route
                path={AppPaths.users.permissions.list}
                element={<ListUsers />}
              />

              {/* Visitors */}
              <Route path={AppPaths.visitors.add} element={<VisitorAdd />} />
              <Route path={AppPaths.visitors.all} element={<VisitorAll />} />
              <Route
                path={AppPaths.visitors.report}
                element={<VisitorReport />}
              />
              <Route
                path={AppPaths.visitors.persona.add}
                element={<PersonaAdd />}
              />
              <Route
                path={AppPaths.visitors.persona.all}
                element={<PersonaAll />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
