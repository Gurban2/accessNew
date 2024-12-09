import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import AddUser from "./components/Pages/Users/AddUser";
import ListUsers from "./components/Pages/Users/ListUsers";
import ViewUser from "./components/Pages/Users/ViewUser";

import { AppPaths } from "./constants/appPaths";
import Dashboard from "./components/dashboard/dashboard";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import OfficesAdd from "./components/Pages/Offices/OfficeAdd";
import OfficesAll from "./components/Pages/Offices/OfficeAll";
import OfficeEdit from "./components/Pages/Offices/OfficeEdit";

import DepartmentEdit from "./components/Pages/Departments/DepartmentEdit";
import DepartmentsAdd from "./components/Pages/Departments/DepartmentsAdd";
import DepartmentsAll from "./components/Pages/Departments/DepartmentsAll";

import VisitorAdd from "./components/Pages/Visitors/VisitorsAdd";
import VisitorAll from "./components/Pages/Visitors/VisitorsAll";
import VisitorEdit from "./components/Pages/Visitors/VisitorsEdit";
import ComplaintsAll from "./components/Pages/Visitors/ComplaintsAll";
import VisitorView from "./components/Pages/Visitors/VisitorsView";

import PersonaAdd from "./components/Pages/Visitors/Persona/PersonaAdd";
import PersonaAll from "./components/Pages/Visitors/Persona/PersonaAll";

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
            <Route path={AppPaths.dashboard} element={<Dashboard />} />
            <Route
              path={AppPaths.departments.add}
              element={<ProtectedRoute element={<DepartmentsAdd />} />}
            />
            <Route
              path={AppPaths.departments.all}
              element={<ProtectedRoute element={<DepartmentsAll />} />}
            />
            <Route
              path={AppPaths.departments.edit}
              element={<ProtectedRoute element={<DepartmentEdit />} />}
            />
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
            <Route path={AppPaths.visitors.add} element={<VisitorAdd />} />
            <Route path={AppPaths.visitors.all} element={<VisitorAll />} />
            <Route path={AppPaths.visitors.edit} element={<VisitorEdit />} />
            <Route path={AppPaths.visitors.view} element={<VisitorView />} />
            <Route
              path={AppPaths.visitors.complaint}
              element={<ComplaintsAll />}
            />
            <Route
              path={AppPaths.persona.add}
              element={<ProtectedRoute element={<PersonaAdd />} />}
            />
            <Route path={AppPaths.persona.all} element={<PersonaAll />} />

            <Route path={AppPaths.users.add} element={<AddUser />} />
            <Route path={AppPaths.users.all} element={<ListUsers />} />
            <Route path={AppPaths.users.edit} element={<ViewUser />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Main;
