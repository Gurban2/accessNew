import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";

import store from "./store";
import Header from "./components/Header/Header";
import DepartmentsAdd from "./components/Pages/Departments/DepartmentsAdd";
import DepartmentsAll from "./components/Pages/Departments/DepartmentsAll";
import DepartmentEdit from "./components/Pages/Departments/DepartmentEdit";
import OfficesAdd from "./components/Pages/Offices/OfficeAdd";
import OfficesAll from "./components/Pages/Offices/OfficeAll";
import OfficeEdit from "./components/Pages/Offices/OfficeEdit";
import VisitorAdd from "./components/Pages/Visitors/VisitorsAdd";
import VisitorAll from "./components/Pages/Visitors/VisitorsAll";
import VisitorEdit from "./components/Pages/Visitors/VisitorsEdit";
import VisitorView from "./components/Pages/Visitors/VisitorsView";
import VisitorReport from "./components/Pages/Visitors/VisitorsReport";
import Sidebar from "./components/Sidebar";

import AddPermissions from "./components/Pages/UserPermissions/AddPermissions";
import AddUser from "./components/Pages/UserPermissions/AddUser";
import AllPermissions from "./components/Pages/UserPermissions/AllPermissions";
import ListUsers from "./components/Pages/UserPermissions/ListUsers";

import PersonaAdd from "./components/Pages/Visitors/Persona/PersonaAdd";
import PersonaAll from "./components/Pages/Visitors/Persona/PersonaAll";
import { AppPaths } from "./constants/appPaths";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./components/dashboard";
import { AuthProvider } from "./contexts/auth/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Pages/Login/Login";
import "./App.scss";

const queryClient = new QueryClient();

function App() {
  const [isCollapsedSideBar, setIsCollapsedSideBar] = useState(false); // Tracks sidebar collapsed state

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Provider store={store}>
          <ToastContainer position="top-right" />
          <Router>
            <div className="app">
              <Sidebar
                isCollapsed={isCollapsedSideBar}
                onToggleCollapse={setIsCollapsedSideBar}
              />
              <div className={`main ${isCollapsedSideBar ? "main--full" : ""}`}>
                <Header isCollapsedSideBar={isCollapsedSideBar} />

                <div className="content">
                  <Routes>
                    {/* Public Route */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected Route */}
                    <Route
                      path={AppPaths.dashboard.home}
                      element={<ProtectedRoute element={<Dashboard />} />}
                    />

                    {/* <Route path={AppPaths.dashboard.home} element={<Dashboard />} /> */}
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

                    {/* Visitors */}
                    <Route
                      path={AppPaths.visitors.add}
                      element={<VisitorAdd />}
                    />
                    <Route
                      path={AppPaths.visitors.all}
                      element={<VisitorAll />}
                    />
                    <Route
                      path={AppPaths.visitors.edit}
                      element={<VisitorEdit />}
                    />
                    <Route
                      path={AppPaths.visitors.view}
                      element={<VisitorView />}
                    />
                    <Route
                      path={AppPaths.visitors.persona.all}
                      element={<PersonaAll />}
                    />
                    <Route
                      path={AppPaths.visitors.persona.add}
                      element={<PersonaAdd />}
                    />
                    <Route
                      path={AppPaths.users.permissions.add}
                      element={<AddPermissions />}
                    />
                    <Route
                      path={AppPaths.users.permissions.addUser}
                      element={<AddUser />}
                    />
                    <Route
                      path={AppPaths.users.permissions.all}
                      element={<AllPermissions />}
                    />
                    <Route
                      path={AppPaths.users.permissions.list}
                      element={<ListUsers />}
                    />

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
                    {/* Redirect to login if the user tries to access any unprotected route */}
                    {/* <Route path="*" element={<Navigate to="/login" />} /> */}
                  </Routes>
                </div>
              </div>
            </div>
          </Router>
        </Provider>
      </AuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
