import { AppPaths } from "./appPaths";
import officeIcon from "../assets/dashboardIcons/officeIcon.svg";
import departmentIcon from "../assets/dashboardIcons/departmentIcon.svg";
import personaIcon from "../assets/dashboardIcons/personaIcon.png";
import usersIcon from "../assets/dashboardIcons/usersIcon.png";
import visitorsIcon from "../assets/dashboardIcons/visitor-card.png";
import permissionsIcon from "../assets/dashboardIcons/permissionsIcon.png";

const sections = [
  {
    title: "Offices and Departments",
    departments: [
      {
        title: "Offices",
        icon: officeIcon,
        items: [
          { label: "all", path: AppPaths.offices.all },
          { label: "add", path: AppPaths.offices.add },
        ],
      },
      {
        title: "Departments",
        icon: departmentIcon,
        items: [
          { label: "all", path: AppPaths.departments.all },
          { label: "add", path: AppPaths.departments.add },
        ],
      },
    ],
  },
  {
    title: "Visitors",
    departments: [
      {
        title: "Visitors",
        icon: visitorsIcon,
        items: [
          { label: "all", path: AppPaths.visitors.all },
          { label: "add", path: AppPaths.visitors.add },
        ],
      },
      {
        title: "Persona Non Grata",
        icon: personaIcon,
        items: [
          { label: "all", path: AppPaths.visitors.persona.all },
          { label: "add", path: AppPaths.visitors.persona.add },
        ],
      },
    ],
  },
  {
    title: "Users & Permissions",
    departments: [
      {
        title: "Users",
        icon: usersIcon,
        items: [
          { label: "List", path: AppPaths.users.permissions.list },
          { label: "add User", path: AppPaths.users.permissions.addUser },
        ],
      },
      {
        title: "Permissions",
        icon: permissionsIcon,
        items: [
          { label: "all", path: AppPaths.users.permissions.all },
          { label: "add Permission", path: AppPaths.users.permissions.add },
        ],
      },
    ],
  },
];

export default sections;
