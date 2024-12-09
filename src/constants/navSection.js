import React from "react";
import {
  FaBuilding,
  FaChartBar,
  FaUser,
  FaUsers,
  FaUserTimes,
} from "react-icons/fa";
import { AppPaths } from "./appPaths";

const sections = [
  {
    title: "officesDepartments",
    departments: [
      {
        title: "offices",
        icon: <FaChartBar />,
        items: [
          { label: "all", path: AppPaths.offices.all },
          { label: "add", path: AppPaths.offices.add },
        ],
      },
      {
        title: "departments",
        icon: <FaBuilding />,
        items: [
          { label: "all", path: AppPaths.departments.all },
          { label: "add", path: AppPaths.departments.add },
        ],
      },
    ],
  },
  {
    title: "visitors",
    departments: [
      {
        title: "visitors",
        icon: <FaUser />,
        items: [
          { label: "all", path: AppPaths.visitors.all },
          { label: "add", path: AppPaths.visitors.add },
          { label: "Report", path: AppPaths.visitors.complaint },
        ],
      },
      {
        title: "personaNonGrata",
        icon: <FaUserTimes />,
        items: [
          { label: "all", path: AppPaths.persona.all },
          { label: "add", path: AppPaths.persona.add },
        ],
      },
    ],
  },
  {
    title: "users",
    departments: [
      {
        title: "users",
        icon: <FaUsers />,
        items: [
          { label: "all", path: AppPaths.users.all },
          { label: "add", path: AppPaths.users.add },
        ],
      },
    ],
  },
];

export default sections;
