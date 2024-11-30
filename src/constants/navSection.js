import { AppPaths } from "./appPaths";
import officeIcon from "../assets/icons/dashboard/officeIcon.svg";
import departmentIcon from "../assets/icons/dashboard/departmentIcon.png";
import personaIcon from "../assets/icons/dashboard/personaIcon.svg";
import usersIcon from "../assets/icons/dashboard/usersIcon.png";
import visitorsIcon from "../assets/icons/dashboard/visitor.svg";
import permissionsIcon from "../assets/icons/dashboard/permissionsIcon.png";
// import dashboard from "../assets/icons/dashboard/dashboard.svg";

const sections = [
  // { title: "Dashboard", icon: dashboard, path: AppPaths.offices.dashboard },
  {
    title: "Offices and Departments",
    departments: [
      {
        title: "Offices",
        icon: officeIcon,
        items: [
          { label: "All", path: AppPaths.offices.all },
          { label: "Add", path: AppPaths.offices.add },
        ],
      },
      {
        title: "Departments",
        icon: departmentIcon,
        items: [
          { label: "All", path: AppPaths.departments.all },
          { label: "Add", path: AppPaths.departments.add },
        ],
      },
    ],
    icon: officeIcon,
  },
  {
    title: "Visitors",
    departments: [
      {
        title: "Visitors",
        icon: visitorsIcon,
        items: [
          { label: "All", path: AppPaths.visitors.all },
          { label: "Add", path: AppPaths.visitors.add },
        ],
      },
      {
        title: "Persona Non Grata",
        icon: personaIcon,
        items: [
          { label: "All", path: AppPaths.visitors.persona.all },
          { label: "Add", path: AppPaths.visitors.persona.add },
        ],
      },
    ],
    icon: visitorsIcon,
  },
  {
    title: "Users & Permissions",
    departments: [
      {
        title: "Users",
        icon: usersIcon,
        items: [
          { label: "List", path: AppPaths.users.permissions.list },
          { label: "Add User", path: AppPaths.users.permissions.addUser },
        ],
      },
      {
        title: "Permissions",
        icon: permissionsIcon,
        items: [
          { label: "All", path: AppPaths.users.permissions.all },
          { label: "Add Permission", path: AppPaths.users.permissions.add },
        ],
      },
    ],
    icon: usersIcon,
  },
];

export default sections;
