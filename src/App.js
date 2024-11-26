import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import NavbarDarkExample from "./components/NavbarDarkExample/NavbarDarkExample";
import DepartmentsAdd from "./components/Pages/Departments/DepartmentsAdd";
import DepartmentsAll from "./components/Pages/Departments/DepartmentsAll";
import DepartmentEdit from "./components/Pages/Departments/DepartmentEdit";
import OfficesAdd from "./components/Pages/Offices/OfficeAdd";
import OfficesAll from "./components/Pages/Offices/OfficeAll";
import OfficeEdit from "./components/Pages/Offices/OfficeEdit";

import SiteSet from "./components/Pages/Site/SiteSet";
import Translations from "./components/Pages/Site/Translations";
import AddPer from "./components/Pages/UserPermissions/AddPer";
import AddUser from "./components/Pages/UserPermissions/AddUser";
import AllPer from "./components/Pages/UserPermissions/AllPer";
import ListUsers from "./components/Pages/UserPermissions/ListUsers";
import VisitorAdd from "./components/Pages/Visitors/VisitorsAdd";
import VisitorAll from "./components/Pages/Visitors/VisitorsAll";
import VisitorReport from "./components/Pages/Visitors/VisitorsReport";
import PersonaAdd from "./components/Pages/Visitors/Persona/Add";
import PersonaAll from "./components/Pages/Visitors/Persona/All";
import { AppPaths } from "./constants/appPaths";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" />
      <Router>
        <div className="app">
          <NavbarDarkExample /> {/* Сайдбар */}
          <div className="main">
            <div className="content">
              <Routes>
                {/* Offices */}
                <Route path={AppPaths.offices.add} element={<OfficesAdd />} />
                <Route path={AppPaths.offices.all} element={<OfficesAll />} />
                <Route path={AppPaths.offices.edit} element={<OfficeEdit />} />

                {/* Departments */}
                <Route
                  path={AppPaths.departments.add}
                  element={<DepartmentsAdd />}
                />
                <Route
                  path={AppPaths.departments.all}
                  element={<DepartmentsAll />}
                />
                <Route
                  path={AppPaths.departments.edit}
                  element={<DepartmentEdit />}
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
    </Provider>
  );
}

export default App;
