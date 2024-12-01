import React from "react";
import { AppPaths } from "./appPaths";
import {
  FaBuilding,
  FaChartBar,
  FaUser,
  FaUserCheck,
  FaUsers,
  FaUserTimes,
} from "react-icons/fa";

// import dashboard from "../assets/icons/dashboard/dashboard.svg";

const sections = [
  // { title: "Dashboard", icon: dashboard, path: AppPaths.offices.dashboard },
  {
    title: "Offices and Departments",
    departments: [
      {
        title: "Offices",
        icon: <FaChartBar />,
        items: [
          { label: "All", path: AppPaths.offices.all },
          { label: "Add", path: AppPaths.offices.add },
        ],
      },
      {
        title: "Departments",
        icon: <FaBuilding />,
        items: [
          { label: "All", path: AppPaths.departments.all },
          { label: "Add", path: AppPaths.departments.add },
        ],
      },
    ],
  },
  {
    title: "Visitors",
    departments: [
      {
        title: "Visitors",
        icon: <FaUser />,
        items: [
          { label: "All", path: AppPaths.visitors.all },
          { label: "Add", path: AppPaths.visitors.add },
        ],
      },
      {
        title: "Persona Non Grata",
        icon: <FaUserTimes />,
        items: [
          { label: "All", path: AppPaths.visitors.persona.all },
          { label: "Add", path: AppPaths.visitors.persona.add },
        ],
      },
    ],
  },
  {
    title: "Users & Permissions",
    departments: [
      {
        title: "Users",
        icon: <FaUsers />,
        items: [
          { label: "List", path: AppPaths.users.permissions.list },
          { label: "Add User", path: AppPaths.users.permissions.addUser },
        ],
      },
      {
        title: "Permissions",
        icon: <FaUserCheck />,
        items: [
          { label: "All", path: AppPaths.users.permissions.all },
          { label: "Add Permission", path: AppPaths.users.permissions.add },
        ],
      },
    ],
  },
];

export default sections;
