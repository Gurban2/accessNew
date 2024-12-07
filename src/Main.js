import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

// User Permissions imports (grouped together)
import AddUser from "./components/Pages/UserPermissions/AddUser";
import ListUsers from "./components/Pages/UserPermissions/ListUsers";
import AddPermissions from "./components/Pages/UserPermissions/AddPermissions";
import AllPermissions from "./components/Pages/UserPermissions/AllPermissions";

// Other components and paths imports
import { AppPaths } from "./constants/appPaths";
import Dashboard from "./components/dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// Offices imports
import OfficesAdd from "./components/Pages/Offices/OfficeAdd";
import OfficesAll from "./components/Pages/Offices/OfficeAll";
import OfficeEdit from "./components/Pages/Offices/OfficeEdit";

// Departments imports
import DepartmentEdit from "./components/Pages/Departments/DepartmentEdit";
import DepartmentsAdd from "./components/Pages/Departments/DepartmentsAdd";
import DepartmentsAll from "./components/Pages/Departments/DepartmentsAll";

// Visitors imports
import VisitorAdd from "./components/Pages/Visitors/VisitorsAdd";
import VisitorAll from "./components/Pages/Visitors/VisitorsAll";
import VisitorEdit from "./components/Pages/Visitors/VisitorsEdit";
import VisitorReport from "./components/Pages/Visitors/VisitorsReport";
import VisitorView from "./components/Pages/Visitors/VisitorsView";

// Persona imports
import PersonaAdd from "./components/Pages/Visitors/Persona/PersonaAdd";
import PersonaAll from "./components/Pages/Visitors/Persona/PersonaAll";

// Other necessary imports
import ProtectedRoute from "./components/ProtectedRoute";

function Main() {
  const [isCollapsedSideBar, setIsCollapsedSideBar] = useState(false);

  return (
    <div className="app">
      <Sidebar
        isCollapsed={isCollapsedSideBar}
        onToggleCollapse={setIsCollapsedSideBar}
      />
      <div className={`main ${isCollapsedSideBar ? "main--full" : ""}`}>
        <Header isCollapsedSideBar={isCollapsedSideBar} />
        <div className="content">
          <Routes>
            {/* Dashboard */}
            <Route path={AppPaths.dashboard.home} element={<Dashboard />} />
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
            {/* Offices */}
            <Route
              path={AppPaths.offices.add}
              element={<ProtectedRoute element={<OfficesAdd />} />}
            />
            <Route
              path={AppPaths.offices.all}
              element={<ProtectedRoute element={<OfficesAll />} />}
            />
            <Route
              path={AppPaths.offices.edit}
              element={<ProtectedRoute element={<OfficeEdit />} />}
            />
            {/* Visitors */}
            <Route path={AppPaths.visitors.add} element={<VisitorAdd />} />
            <Route path={AppPaths.visitors.all} element={<VisitorAll />} />
            <Route path={AppPaths.visitors.edit} element={<VisitorEdit />} />
            <Route path={AppPaths.visitors.view} element={<VisitorView />} />
            <Route
              path={AppPaths.visitors.report}
              element={<VisitorReport />}
            />
            {/* Personas */}
            <Route
              path={AppPaths.visitors.persona.add}
              element={<PersonaAdd />}
            />
            <Route
              path={AppPaths.visitors.persona.all}
              element={<PersonaAll />}
            />
            {/* Users */}
            <Route
              path={AppPaths.users.permissions.addUser}
              element={<AddUser />}
            />
            <Route
              path={AppPaths.users.permissions.list}
              element={<ListUsers />}
            />
            {/* Permissions */}
            <Route
              path={AppPaths.users.permissions.add}
              element={<AddPermissions />}
            />
            <Route
              path={AppPaths.users.permissions.all}
              element={<AllPermissions />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Main;
